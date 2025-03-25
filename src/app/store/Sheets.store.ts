import axios, { AxiosError } from 'axios'
import { create } from 'zustand'
import Cookies from 'js-cookie'
import {
  SignatureSheet,
  SignatureStudentData,
} from '@/app/presence/models/signature.model'
export interface storeSheet {
  signatureSheet: SignatureSheet[] | undefined
  studentSignatureSheet: SignatureStudentData[] | undefined
  studentSignatureSheetByModule: SignatureSheet[] | undefined
  setSignatureSheet: () => Promise<SignatureSheet[] | undefined>
  setSignatureSheetDetail: (
    moduleName: string,
    promo: string,
    createdAt: string,
    finishAt: string,
  ) => Promise<SignatureStudentData[] | undefined>
  setSignatureSheetModule: (
    moduleName: string,
  ) => Promise<SignatureSheet[] | undefined>
  justifyStudentSignature: (
    moduleName: string,
    promo: string,
    createdAt: string,
    finishAt: string,
    numEtu: string,
  ) => Promise<void>
}

export const storeSheet = create<storeSheet>((set) => ({
  signatureSheet: undefined,
  studentSignatureSheet: undefined,
  studentSignatureSheetByModule: undefined,
  setSignatureSheet: async () => {
    const bearer = Cookies.get('bearer')
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/sheets/all`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        },
      )
      const data = response.data
      set({ signatureSheet: data })
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des modules :', error)
    }
  },
  setSignatureSheetDetail: async (
    moduleName: string,
    promo: string,
    createdAt: string,
    finishAt: string,
  ) => {
    const bearer = Cookies.get('bearer')
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/sheets/${moduleName}/${promo}/${createdAt}/${finishAt}`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        },
      )

      const data = response.data
      set({ studentSignatureSheet: data.signatures })
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des modules :', error)
    }
  },

  setSignatureSheetModule: async (moduleName: string) => {
    const bearer = Cookies.get('bearer')
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_PATH}/sheets/module/${moduleName}`,
        {
          headers: {
            Authorization: `Bearer ${bearer?.toString()}`,
          },
        },
      )
      const data = response.data
      set({ studentSignatureSheetByModule: data })
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération des modules :', error)
    }
  },
  justifyStudentSignature: async (
    moduleName: string,
    promo: string,
    createdAt: string,
    finishAt: string,
    numEtu: string,
  ) => {
    try {
      const API_PATH = process.env.NEXT_PUBLIC_API_PATH

      await axios.put<SignatureSheet>(
        `${API_PATH}/sheets/${moduleName}/${promo}/${createdAt}/${finishAt}/${numEtu}`,
      )
    } catch (err: unknown) {
      const error = err as AxiosError
      console.error('Erreur lors de la justification de signature :', error)
    }
  },
}))
