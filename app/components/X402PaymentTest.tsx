'use client'

import { useState } from 'react'
import { useX402Payment } from '../hooks/useX402Payment'
import { ConnectWallet } from '@coinbase/onchainkit/wallet'
import { Wallet, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react'

export function X402PaymentTest() {
  const {
    handlePayment,
    createX402Instance,
    isProcessing,
    lastPayment,
    isConnected,
    address,
  } = useX402Payment()

  const [amount, setAmount] = useState('1')
  const [recipient, setRecipient] = useState('')
  const [testUrl, setTestUrl] = useState('')
  const [apiResponse, setApiResponse] = useState<string | null>(null)
  const [apiError, setApiError] = useState<string | null>(null)

  const handleDirectPayment = async () => {
    if (!recipient) {
      alert('Please enter a recipient address')
      return
    }

    const result = await handlePayment({
      amount,
      recipient,
      chainId: 8453, // Base
    })

    if (result.success) {
      console.log('Payment successful:', result)
    } else {
      console.error('Payment failed:', result.error)
    }
  }

  const handleX402Request = async () => {
    if (!testUrl) {
      alert('Please enter an API URL to test')
      return
    }

    try {
      setApiError(null)
      setApiResponse(null)
      
      const client = createX402Instance()
      
      if (!client) {
        setApiError('Please connect your wallet first')
        return
      }
      
      const response = await client.get(testUrl)
      
      setApiResponse(JSON.stringify(response.data, null, 2))
    } catch (error: any) {
      setApiError(error.message || 'Request failed')
      console.error('X402 request error:', error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <Wallet className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            X402 Payment Flow Test
          </h1>
        </div>

        {/* Wallet Connection */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            1. Connect Wallet
          </h2>
          <ConnectWallet />
          {isConnected && (
            <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span>Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          )}
        </div>

        {/* Direct Payment Test */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            2. Test Direct Payment (USDC on Base)
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount (USDC)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="1.0"
                step="0.01"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Address
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="0x..."
              />
            </div>
            <button
              onClick={handleDirectPayment}
              disabled={!isConnected || isProcessing}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Send Payment'
              )}
            </button>
          </div>
        </div>

        {/* X402 API Test */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            3. Test X402 API Request
          </h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                API URL (returns 402 Payment Required)
              </label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                placeholder="https://api.example.com/premium-content"
              />
            </div>
            <button
              onClick={handleX402Request}
              disabled={!isConnected || isProcessing}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Make X402 Request'
              )}
            </button>
          </div>
        </div>

        {/* Payment Result */}
        {lastPayment && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Last Payment Result
            </h2>
            {lastPayment.success ? (
              <div className="flex items-start gap-3 text-green-700">
                <CheckCircle className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Payment Successful!</p>
                  {lastPayment.transactionHash && (
                    <p className="text-sm mt-1 break-all">
                      Tx: {lastPayment.transactionHash}
                    </p>
                  )}
                  {lastPayment.confirmations && (
                    <p className="text-sm">
                      Confirmations: {lastPayment.confirmations}
                    </p>
                  )}
                  <a
                    href={`https://basescan.org/tx/${lastPayment.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline inline-block mt-1"
                  >
                    View on BaseScan ?
                  </a>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 text-red-700">
                <XCircle className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Payment Failed</p>
                  <p className="text-sm mt-1">{lastPayment.error}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* API Response */}
        {(apiResponse || apiError) && (
          <div className="p-4 bg-gray-50 rounded-lg mt-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              API Response
            </h2>
            {apiResponse && (
              <pre className="bg-gray-900 text-green-400 p-4 rounded text-sm overflow-auto">
                {apiResponse}
              </pre>
            )}
            {apiError && (
              <div className="flex items-start gap-3 text-red-700">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium">Request Failed</p>
                  <p className="text-sm mt-1">{apiError}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Documentation */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            Implementation Notes
          </h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Uses wagmi useWalletClient for wallet interactions</li>
            <li>Integrates x402-axios for HTTP 402 payment flow</li>
            <li>USDC on Base (0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913)</li>
            <li>Waits for 1 confirmation before returning success</li>
            <li>Includes comprehensive error handling</li>
            <li>Automatic retry with payment proof on 402 responses</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
