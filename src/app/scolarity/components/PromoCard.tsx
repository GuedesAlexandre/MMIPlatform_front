'use client'

import { Button } from '@/components/ui/button'
import { PersonIcon, ArrowRightIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React from 'react'

interface PromoCardProps {
  title?: string
  color?: string
  number?: number
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  color,
  number,
}: PromoCardProps) => {
  const router = useRouter()
  const handleClickChoosePromo = (promo: string) => {
    router.push(`/scolarity/list-absent?promo=${promo}`)
  }

  return (
    <>
      <div className='mt-5 w-full mx-auto border border-placeholder-color rounded-md'>
        <div
          className={
            title === 'MMI01'
              ? 'bg-MMI01 text-background-color flex flex-row justify-between pt-44 px-5'
              : title === 'MMI02'
              ? 'bg-MMI02 text-background-color flex flex-row justify-between pt-44 px-5'
              : 'bg-MMI03 text-background-color flex flex-row justify-between pt-44 px-5'
          }
        >
          <p className='pb-3'>{title}</p>
          <div className='flex flex-row items-center pb-3'>
            <PersonIcon />
            <p>{number}</p>
          </div>
        </div>
        <div className='px-4 flex flex-row justify-between items-center py-5'>
          <div className='flex justify-end'>
            <Button
              onClick={() => handleClickChoosePromo(String(title))}
              className='bg-primary-blue hover:bg-primary-blue-hover'
            >
              Voir la promotion <ArrowRightIcon />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default PromoCard
