import { Promo } from '@/app/models/enums/PromoEnum'
import { RadioModelProps } from '@/app/models/ui/radio.model'

export const createArrayRadioUI = (promo?: string, switchValue?: boolean) => {
  if (!promo || switchValue == undefined) return []

  const arrayRadio: RadioModelProps[] = []

  const tdOptions = [
    'TD1',
    'TD2',
    'CM',
    ...(promo === Promo.FIRSTYEAR ? ['TD3'] : []),
  ]

  const tpOptions = [
    'TP-A',
    'TP-B',
    'TP-C',
    'TP-D',
    ...(promo === Promo.FIRSTYEAR ? ['TP-E', 'TP-F'] : []),
  ]

  if (switchValue) {
    tpOptions.forEach((label) => arrayRadio.push({ label }))
  } else {
    tdOptions.forEach((label) => arrayRadio.push({ label }))
  }

  return arrayRadio
}
