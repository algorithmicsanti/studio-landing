'use client'

import { useState } from 'react'
import styles from './demo-request-form.module.css'

interface DemoRequestFormProps {
  isOpen: boolean
  onClose: () => void
  initialEmail?: string
}

export default function DemoRequestForm({ isOpen, onClose, initialEmail }: DemoRequestFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: initialEmail || '',
    fullName: '',
    phone: '',
    company: '',
    employees: '',
  })

  const totalSteps = 5

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleNext = () => {
    if (isStepValid()) {
      if (step < totalSteps) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return formData.email.includes('@') && formData.email.length > 0
      case 2:
        return formData.fullName.length > 0
      case 3:
        return formData.phone.length > 0
      case 4:
        return formData.company.length > 0
      case 5:
        return formData.employees.length > 0
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('¡Gracias! Nos pondremos en contacto pronto.')
        resetForm()
        onClose()
      } else {
        alert('Hubo un error. Intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Hubo un error. Intenta de nuevo.')
    }
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      email: '',
      fullName: '',
      phone: '',
      company: '',
      employees: '',
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={handleClose}>
          ×
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>Solicita un Demo</h2>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
          <p className={styles.stepIndicator}>
            Paso {step} de {totalSteps}
          </p>
        </div>

        <div className={styles.content}>
          {/* Step 1: Email */}
          {step === 1 && (
            <div className={styles.step}>
              <label className={styles.label}>¿Cuál es tu correo empresarial?</label>
              <input
                type="email"
                name="email"
                placeholder="tu@empresa.com"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.input}
                autoFocus
              />
            </div>
          )}

          {/* Step 2: Full Name */}
          {step === 2 && (
            <div className={styles.step}>
              <label className={styles.label}>¿Cuál es tu nombre completo?</label>
              <input
                type="text"
                name="fullName"
                placeholder="Juan Pérez"
                value={formData.fullName}
                onChange={handleInputChange}
                className={styles.input}
                autoFocus
              />
            </div>
          )}

          {/* Step 3: Phone */}
          {step === 3 && (
            <div className={styles.step}>
              <label className={styles.label}>¿Cuál es tu teléfono?</label>
              <div className={styles.phoneInput}>
                <span className={styles.phoneFlag}>🇲🇽 +52</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="1234567890"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.inputPhone}
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* Step 4: Company */}
          {step === 4 && (
            <div className={styles.step}>
              <label className={styles.label}>¿En qué empresa trabajas?</label>
              <input
                type="text"
                name="company"
                placeholder="Nombre de la empresa"
                value={formData.company}
                onChange={handleInputChange}
                className={styles.input}
                autoFocus
              />
            </div>
          )}

          {/* Step 5: Number of Employees */}
          {step === 5 && (
            <div className={styles.step}>
              <label className={styles.label}>¿Cuántos colaboradores tiene tu empresa?</label>
              <select
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className={styles.select}
                autoFocus
              >
                <option value="">Selecciona un rango</option>
                <option value="1-50">1 - 50</option>
                <option value="51-200">51 - 200</option>
                <option value="201-500">201 - 500</option>
                <option value="501-1000">501 - 1,000</option>
                <option value="1000+">1,000+</option>
              </select>
            </div>
          )}
        </div>

        <div className={styles.footer}>
          <button
            className={styles.backBtn}
            onClick={handleBack}
            disabled={step === 1}
          >
            ← Atrás
          </button>
          <button
            className={styles.nextBtn}
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {step === totalSteps ? 'Enviar' : 'Siguiente →'}
          </button>
        </div>
      </div>
    </div>
  )
}
