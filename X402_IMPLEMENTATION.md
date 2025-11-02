# X402 Payment Flow Implementation

## Overview
This implementation integrates the x402 payment protocol with wagmi and OnchainKit for seamless crypto payments on Base network using USDC.

## Architecture

### Components

#### 1. Providers Configuration (`app/components/Providers.tsx`)
- **WagmiProvider**: Configured with Base network support
- **OnchainKitProvider**: Provides onchain utilities
- **Wallet Connectors**:
  - Coinbase Wallet (Smart Wallet Only)
  - WalletConnect
- **USDC Token**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` (Base mainnet)

#### 2. Payment Hook (`app/hooks/useX402Payment.ts`)
Core functionality for x402 payment integration:

**Key Features:**
- Uses `useWalletClient` from wagmi for wallet interactions
- Creates x402-compatible axios instance with payment interceptor
- Handles direct USDC payments
- Automatic 402 response handling
- Transaction confirmation tracking
- Comprehensive error handling

**Exports:**
```typescript
interface PaymentRequest {
  amount: string           // USDC amount (e.g., "1.5")
  recipient: string        // Ethereum address
  chainId: number         // Network chain ID (8453 for Base)
  tokenAddress?: string   // Optional, defaults to USDC
}

interface PaymentResult {
  success: boolean
  transactionHash?: string
  error?: string
  confirmations?: number
}

function useX402Payment() {
  handlePayment: (paymentRequest: PaymentRequest) => Promise<PaymentResult>
  createX402Instance: () => AxiosInstance | null
  isProcessing: boolean
  lastPayment: PaymentResult | null
  isConnected: boolean
  address: string | undefined
}
```

**Usage:**
```typescript
const { handlePayment, createX402Instance, isConnected } = useX402Payment()

// Direct payment
const result = await handlePayment({
  amount: "1.0",
  recipient: "0x...",
  chainId: 8453
})

// API request with automatic payment handling
const client = createX402Instance()
const response = await client.get('/premium-endpoint')
```

#### 3. Test Component (`app/components/X402PaymentTest.tsx`)
Interactive UI for testing the payment flow:

**Features:**
- Wallet connection interface
- Direct USDC payment testing
- X402 API request testing
- Real-time payment status
- Transaction links to BaseScan
- Error handling display

## Implementation Details

### X402 Flow
1. **Client makes request** to protected endpoint
2. **Server responds with 402** Payment Required
3. **x402-axios intercepts** the 402 response
4. **Extracts payment requirements** from response headers
5. **Creates payment header** using wagmi wallet client
6. **Sends transaction** on-chain (USDC transfer)
7. **Waits for confirmation** (1 block)
8. **Retries original request** with payment proof
9. **Server validates** payment and returns content

### Wagmi Integration
The implementation leverages wagmi's `useWalletClient` hook which returns a viem `WalletClient`. This is directly compatible with x402's `EvmSigner` type (which is `SignerWallet | LocalAccount` from viem), so no adapter is needed.

### Transaction Handling
- Uses ERC20 `transfer` function for USDC payments
- Waits for 1 block confirmation before returning success
- Returns transaction hash for verification
- Full error messages for debugging

## Testing

### Setup
1. **Connect Wallet**: Use Coinbase Wallet or WalletConnect
2. **Ensure USDC Balance**: Need USDC on Base mainnet
3. **Have ETH for Gas**: Need ETH on Base for transaction fees

### Test Cases

#### 1. Direct Payment Test
```typescript
// Test direct USDC transfer
amount: "0.01"
recipient: "0xYourTestAddress"
// Click "Send Payment"
// Check BaseScan for transaction
```

#### 2. X402 API Test
```typescript
// Test automatic payment on 402 response
testUrl: "https://your-api.com/premium-content"
// Click "Make X402 Request"
// Should automatically handle payment if 402 returned
```

### Expected Behavior

**Success Flow:**
1. Connect wallet
2. Enter payment details
3. Click send
4. Wallet prompts for approval
5. Transaction confirmed
6. Success message with tx hash
7. Link to BaseScan

**Error Handling:**
- Wallet not connected: "Wallet not connected"
- Insufficient balance: Contract error message
- User rejection: "User rejected transaction"
- Network error: "Transaction failed" with details

## Environment Variables

```env
# Required for OnchainKit
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key

# Optional for WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional for X402 API testing
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
```

## Dependencies

```json
{
  "dependencies": {
    "wagmi": "^2.14.11",
    "viem": "^2.27.2",
    "x402-axios": "^0.7.0",
    "axios": "^1.7.9",
    "@coinbase/onchainkit": "^0.38.19",
    "@tanstack/react-query": "^5.62.11"
  }
}
```

## Network Configuration

**Base Mainnet:**
- Chain ID: 8453
- RPC: Uses wagmi default
- Explorer: https://basescan.org
- USDC: 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

## Security Considerations

1. **Private Keys**: Never expose private keys in client code
2. **Amount Validation**: Always validate payment amounts
3. **Recipient Verification**: Verify recipient addresses
4. **Transaction Limits**: Consider implementing spending limits
5. **Error Messages**: Don't expose sensitive error details to users

## Troubleshooting

### "Wallet not connected"
- Ensure wallet extension is installed
- Click "Connect Wallet" button
- Approve connection in wallet

### "Insufficient funds"
- Check USDC balance on Base
- Get USDC from exchange or bridge
- Ensure enough ETH for gas

### Transaction fails
- Check network connection
- Verify recipient address is valid
- Ensure sufficient gas
- Check wallet is on Base network

### 402 requests not working
- Verify API endpoint returns proper 402 response
- Check payment requirements in response headers
- Ensure wallet has sufficient USDC
- Check API accepts x402 protocol

## Future Enhancements

- [ ] Support for multiple tokens (ETH, DAI, etc.)
- [ ] Gas estimation preview
- [ ] Payment history tracking
- [ ] Batch payments
- [ ] Payment scheduling
- [ ] Multi-chain support (Polygon, Avalanche, etc.)
- [ ] Payment receipts/invoices

## Resources

- [x402 Protocol](https://github.com/coinbase/x402)
- [x402-axios Documentation](https://github.com/coinbase/x402/tree/main/packages/x402-axios)
- [wagmi Documentation](https://wagmi.sh)
- [OnchainKit Documentation](https://onchainkit.xyz)
- [Base Network](https://base.org)
- [USDC on Base](https://www.centre.io/usdc-on-base)
