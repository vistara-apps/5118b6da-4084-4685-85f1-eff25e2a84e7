'use client'

import { useCallback, useState } from 'react'
import { useWalletClient, useAccount, usePublicClient } from 'wagmi'
import { withPaymentInterceptor, Signer } from 'x402-axios'
import axios, { AxiosInstance } from 'axios'
import { parseUnits, WalletClient, Account } from 'viem'
import { USDC_BASE_ADDRESS } from '../components/Providers'

export interface PaymentRequest {
  amount: string
  recipient: string
  chainId: number
  tokenAddress?: string
}

export interface PaymentResult {
  success: boolean
  transactionHash?: string
  error?: string
  confirmations?: number
}

export interface X402Error {
  status: number
  paymentRequired: boolean
  paymentRequest?: PaymentRequest
}

export function useX402Payment() {
  const { data: walletClient } = useWalletClient()
  const { address, isConnected } = useAccount()
  const [isProcessing, setIsProcessing] = useState(false)
  const [lastPayment, setLastPayment] = useState<PaymentResult | null>(null)

  // wagmi's WalletClient is already compatible with x402's EvmSigner type
  // No adapter needed - just return it directly
  const getX402Signer = useCallback((): Signer | null => {
    if (!walletClient) {
      return null
    }
    // wagmi WalletClient is already a viem Client with WalletActions,
    // which matches x402's SignerWallet type
    return walletClient as unknown as Signer
  }, [walletClient])

  const handlePayment = useCallback(
    async (paymentRequest: PaymentRequest): Promise<PaymentResult> => {
      if (!walletClient || !address || !isConnected) {
        return {
          success: false,
          error: 'Wallet not connected',
        }
      }

      setIsProcessing(true)
      
      try {
        const { amount, recipient, tokenAddress = USDC_BASE_ADDRESS } = paymentRequest

        // Parse USDC amount (6 decimals)
        const amountInWei = parseUnits(amount, 6)

        // ERC20 Transfer ABI
        const transferAbi = [
          {
            name: 'transfer',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
              { name: 'to', type: 'address' },
              { name: 'amount', type: 'uint256' },
            ],
            outputs: [{ name: '', type: 'bool' }],
          },
        ] as const

        // Send transaction using walletClient
        const hash = await walletClient.writeContract({
          address: tokenAddress as `0x${string}`,
          abi: transferAbi,
          functionName: 'transfer',
          args: [recipient as `0x${string}`, amountInWei],
          chain: walletClient.chain,
          account: address,
        })

        // Wait for transaction confirmation
        const publicClient = await import('viem').then((m) =>
          m.createPublicClient({
            chain: walletClient.chain,
            transport: m.http(),
          })
        )

        const receipt = await publicClient.waitForTransactionReceipt({
          hash,
          confirmations: 1,
        })

        const result: PaymentResult = {
          success: receipt.status === 'success',
          transactionHash: hash,
          confirmations: 1,
        }

        setLastPayment(result)
        return result
      } catch (error: any) {
        const errorMessage = error?.message || 'Payment failed'
        const result: PaymentResult = {
          success: false,
          error: errorMessage,
        }
        setLastPayment(result)
        return result
      } finally {
        setIsProcessing(false)
      }
    },
    [walletClient, address, isConnected]
  )

  const createX402Instance = useCallback((): AxiosInstance | null => {
    const signer = getX402Signer()
    
    if (!signer) {
      console.error('Wallet not connected - cannot create X402 instance')
      return null
    }

    try {
      // Create base axios instance
      const axiosInstance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
        timeout: 30000,
      })

      // Add x402 payment interceptor
      // This will automatically handle 402 Payment Required responses
      const x402Client = withPaymentInterceptor(axiosInstance, signer)

      return x402Client
    } catch (error) {
      console.error('Failed to create X402 instance:', error)
      return null
    }
  }, [getX402Signer])

  return {
    handlePayment,
    createX402Instance,
    isProcessing,
    lastPayment,
    isConnected,
    address,
  }
}
