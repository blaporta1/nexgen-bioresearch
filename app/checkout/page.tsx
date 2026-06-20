'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Lock, ChevronRight, AlertTriangle, CheckCircle, CreditCard } from 'lucide-react'
import { NexGenMark } from '@/components/NexGenLogo'

const MOCK_CART = [
  { name: 'BPC-157 — 5mg', sku: 'NXG-BPC-5MG', price: 49.99, qty: 1, purity: '99.4%' },
  { name: 'Wolverine Stack (BPC-157 + TB-500)', sku: 'NXG-WLV-5MG', price: 99.99, qty: 1, purity: '99.2%' },
]

const subtotal = MOCK_CART.reduce((sum, i) => sum + i.price * i.qty, 0)
const shipping = 12.99
const total = subtotal + shipping

export default function CheckoutPage() {
  const [step, setStep] = useState<'info' | 'payment' | 'confirmed'>('info')
  const [attested, setAttested] = useState(false)
  const [ageVerified, setAgeVerified] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zip: '',
    institution: '', researchPurpose: '',
  })

  const canProceed = attested && ageVerified && termsAccepted

  const update = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  if (step === 'confirmed') {
    return (
      <div className="min-h-screen bg-cloud flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-lg p-10 text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: '#D1FAE5' }}
          >
            <CheckCircle size={32} style={{ color: '#059669' }} />
          </div>
          <h1 className="text-navy font-bold mb-2" style={{ fontSize: 28, letterSpacing: '-0.02em' }}>
            Order Confirmed
          </h1>
          <p className="text-slate text-sm mb-6" style={{ lineHeight: 1.7 }}>
            Your order has been received and your researcher attestation has been logged.
            You'll receive a confirmation email with your COA download links and tracking number.
          </p>
          <div
            className="rounded-xl p-4 mb-8 text-left"
            style={{ background: '#F4F7FB', border: '1px solid #C2D8E0' }}
          >
            <p
              style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 11, color: '#5B6B80', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}
            >
              Order Summary
            </p>
            {MOCK_CART.map(item => (
              <div key={item.sku} className="flex justify-between text-sm mb-2">
                <span className="text-navy">{item.name}</span>
                <span className="text-slate">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <div className="h-px bg-frost my-3" />
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-navy">Total</span>
              <span className="text-navy">${total.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cloud">
      {/* Checkout header */}
      <div className="bg-white border-b border-frost">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <NexGenMark size={28} navyColor="#0E1B2E" signalColor="#1568D3" />
          </Link>
          <div className="flex items-center gap-2">
            {['info', 'payment'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step === s || (step === 'payment' && s === 'info') ? '#1568D3' : '#C2D8E0',
                      color: step === s || (step === 'payment' && s === 'info') ? 'white' : '#5B6B80',
                    }}
                  >
                    {step === 'payment' && s === 'info' ? '✓' : i + 1}
                  </div>
                  <span
                    className="text-xs font-medium capitalize hidden sm:block"
                    style={{ color: step === s ? '#1568D3' : '#5B6B80' }}
                  >
                    {s === 'info' ? 'Researcher Info' : 'Payment'}
                  </span>
                </div>
                {i < 1 && <div className="w-8 h-px" style={{ background: '#C2D8E0' }} />}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-slate text-xs">
            <Lock size={12} />
            <span>Secure Checkout</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left form */}
          <div className="lg:col-span-3">
            {step === 'info' && (
              <div>
                <h1 className="text-navy font-bold mb-6" style={{ fontSize: 24, letterSpacing: '-0.01em' }}>
                  Researcher Information
                </h1>

                {/* Compliance gate */}
                <div
                  className="rounded-2xl p-6 mb-8 border"
                  style={{ background: 'white', borderColor: '#C2D8E0' }}
                >
                  <div className="flex items-center gap-2 mb-5">
                    <Shield size={18} style={{ color: '#1568D3' }} />
                    <h2 className="text-navy font-semibold text-sm">
                      Required Researcher Attestation
                    </h2>
                  </div>

                  {/* Attestation #1 — main */}
                  <label
                    className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer mb-3 transition-colors"
                    style={{
                      borderColor: attested ? '#B3CDEF' : '#C2D8E0',
                      background: attested ? '#F0F6FF' : '#FAFBFD',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={attested}
                      onChange={e => setAttested(e.target.checked)}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-navy font-medium text-sm mb-1">
                        Research-Use Attestation <span style={{ color: '#1568D3' }}>*</span>
                      </p>
                      <p className="text-slate text-xs" style={{ lineHeight: 1.65 }}>
                        I confirm that I am a licensed researcher, scientist, or qualified professional
                        purchasing these products strictly for in-vitro or laboratory research purposes.
                        I am <strong>not</strong> purchasing for human or animal consumption, resale for
                        human use, or any purpose other than scientific research.
                      </p>
                    </div>
                  </label>

                  {/* Age verification */}
                  <label
                    className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer mb-3 transition-colors"
                    style={{
                      borderColor: ageVerified ? '#B3CDEF' : '#C2D8E0',
                      background: ageVerified ? '#F0F6FF' : '#FAFBFD',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={ageVerified}
                      onChange={e => setAgeVerified(e.target.checked)}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-navy font-medium text-sm mb-1">
                        Age Verification <span style={{ color: '#1568D3' }}>*</span>
                      </p>
                      <p className="text-slate text-xs" style={{ lineHeight: 1.65 }}>
                        I confirm that I am 18 years of age or older.
                      </p>
                    </div>
                  </label>

                  {/* Terms */}
                  <label
                    className="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors"
                    style={{
                      borderColor: termsAccepted ? '#B3CDEF' : '#C2D8E0',
                      background: termsAccepted ? '#F0F6FF' : '#FAFBFD',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={e => setTermsAccepted(e.target.checked)}
                      className="flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p className="text-navy font-medium text-sm mb-1">
                        Terms of Sale <span style={{ color: '#1568D3' }}>*</span>
                      </p>
                      <p className="text-slate text-xs" style={{ lineHeight: 1.65 }}>
                        I have read and agree to the{' '}
                        <Link href="/legal/terms" className="text-signal underline" target="_blank">
                          Terms of Sale
                        </Link>
                        {' '}and{' '}
                        <Link href="/legal/privacy" className="text-signal underline" target="_blank">
                          Privacy Policy
                        </Link>
                        . I understand that my attestation, IP address, and order details are logged.
                      </p>
                    </div>
                  </label>

                  {!canProceed && (
                    <div className="mt-4 flex items-center gap-2 p-3 rounded-lg" style={{ background: '#FEF3C7', border: '1px solid #F59E0B' }}>
                      <AlertTriangle size={14} style={{ color: '#D97706', flexShrink: 0 }} />
                      <p style={{ fontSize: 12, color: '#92400E', lineHeight: 1.5 }}>
                        All three attestations are required before proceeding to checkout.
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact info */}
                <div className="bg-white rounded-2xl p-6 border border-frost mb-6">
                  <h2 className="text-navy font-semibold text-sm mb-5">Contact Information</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email address *"
                      value={form.email}
                      onChange={e => update('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate focus:border-signal transition-colors"
                      style={{ outline: 'none' }}
                    />
                    <input
                      type="text"
                      placeholder="Institution / Laboratory (optional)"
                      value={form.institution}
                      onChange={e => update('institution', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate focus:border-signal transition-colors"
                      style={{ outline: 'none' }}
                    />
                    <textarea
                      placeholder="Brief research application (optional)"
                      value={form.researchPurpose}
                      onChange={e => update('researchPurpose', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate focus:border-signal transition-colors resize-none"
                      style={{ outline: 'none' }}
                    />
                  </div>
                </div>

                {/* Shipping */}
                <div className="bg-white rounded-2xl p-6 border border-frost mb-6">
                  <h2 className="text-navy font-semibold text-sm mb-5">Shipping Address</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="First name *"
                        value={form.firstName}
                        onChange={e => update('firstName', e.target.value)}
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none' }}
                      />
                      <input
                        placeholder="Last name *"
                        value={form.lastName}
                        onChange={e => update('lastName', e.target.value)}
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none' }}
                      />
                    </div>
                    <input
                      placeholder="Street address *"
                      value={form.address}
                      onChange={e => update('address', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                      style={{ outline: 'none' }}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <input
                        placeholder="City *"
                        value={form.city}
                        onChange={e => update('city', e.target.value)}
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none' }}
                      />
                      <select
                        value={form.state}
                        onChange={e => update('state', e.target.value)}
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm"
                        style={{ outline: 'none' }}
                      >
                        <option value="">State *</option>
                        {['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <input
                        placeholder="ZIP *"
                        value={form.zip}
                        onChange={e => update('zip', e.target.value)}
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none' }}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => canProceed && setStep('payment')}
                  disabled={!canProceed}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: canProceed ? '#1568D3' : '#C2D8E0',
                    cursor: canProceed ? 'pointer' : 'not-allowed',
                    boxShadow: canProceed ? '0 4px 16px rgba(21,104,211,0.3)' : 'none',
                  }}
                >
                  Continue to Payment
                  <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 'payment' && (
              <div>
                <button
                  onClick={() => setStep('info')}
                  className="flex items-center gap-2 text-slate text-sm mb-6 hover:text-navy"
                >
                  ← Back to Researcher Info
                </button>
                <h1 className="text-navy font-bold mb-6" style={{ fontSize: 24, letterSpacing: '-0.01em' }}>
                  Payment
                </h1>

                <div className="bg-white rounded-2xl p-6 border border-frost mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <CreditCard size={18} style={{ color: '#1568D3' }} />
                    <h2 className="text-navy font-semibold text-sm">Card Details</h2>
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-slate">
                      <Lock size={12} />
                      256-bit SSL
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input
                      placeholder="Card number"
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                      style={{ outline: 'none', fontFamily: 'var(--font-jetbrains)' }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        placeholder="MM / YY"
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none', fontFamily: 'var(--font-jetbrains)' }}
                      />
                      <input
                        placeholder="CVV"
                        className="px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                        style={{ outline: 'none', fontFamily: 'var(--font-jetbrains)' }}
                      />
                    </div>
                    <input
                      placeholder="Name on card"
                      className="w-full px-4 py-3 rounded-xl border border-frost text-navy text-sm placeholder:text-slate"
                      style={{ outline: 'none' }}
                    />
                  </div>
                </div>

                <div
                  className="rounded-xl p-4 mb-6 border"
                  style={{ background: '#F4F7FB', borderColor: '#C2D8E0' }}
                >
                  <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 10, color: '#5B6B80', lineHeight: 1.65, letterSpacing: '0.02em' }}>
                    YOUR PAYMENT IS PROCESSED BY A CERTIFIED HIGH-RISK PAYMENT PROCESSOR.
                    WE ACCEPT MAJOR CREDIT CARDS AND CRYPTOCURRENCY (BITCOIN, ETHEREUM, USDC).
                    YOUR ATTESTATION AND ORDER DETAILS ARE LOGGED WITH THIS TRANSACTION.
                  </p>
                </div>

                <button
                  onClick={() => setStep('confirmed')}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-semibold text-white"
                >
                  <Lock size={15} />
                  Place Secure Order — ${total.toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Right — Order summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-frost p-6 sticky top-32">
              <h2 className="text-navy font-semibold mb-5 text-sm">Order Summary</h2>

              <div className="space-y-4 mb-5">
                {MOCK_CART.map(item => (
                  <div key={item.sku} className="flex items-start gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: '#F4F7FB' }}
                    >
                      <NexGenMark size={24} navyColor="#0E1B2E" signalColor="#1568D3" />
                    </div>
                    <div className="flex-1">
                      <p className="text-navy text-sm font-medium">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="purity-badge" style={{ fontSize: 10 }}>{item.purity}</span>
                        <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 9, color: '#5B6B80' }}>
                          {item.sku}
                        </span>
                      </div>
                    </div>
                    <p className="text-navy font-semibold text-sm">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-frost pt-4 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Subtotal</span>
                  <span className="text-navy">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate">Shipping (2-day cold chain)</span>
                  <span className="text-navy">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-t border-frost pt-3 flex justify-between">
                  <span className="text-navy font-bold">Total</span>
                  <span className="text-navy font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Trust seals */}
              <div className="mt-6 pt-5 border-t border-frost">
                {[
                  { icon: Shield, text: 'Researcher attestation required & logged' },
                  { icon: Lock, text: '256-bit SSL encrypted payment' },
                  { icon: CheckCircle, text: 'COA download included with order' },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-2 mb-2.5">
                    <item.icon size={13} className="text-signal flex-shrink-0" />
                    <span className="text-slate text-xs">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
