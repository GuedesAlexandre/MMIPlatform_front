'use client'
import TitleHeaderUI from '@/app/components/ui/TitleHeaderUI'
import { FileTextIcon } from 'lucide-react'
import { useEffect } from 'react'
import { getModuleStore } from '@/app/store/getAllModules.store'
import Accordion from '@/app/components/accordion'
import { Promo } from '@/app/models/enums/PromoEnum'
import ResourceCard from '@/app/scolarity/all-missing-list/components/resourcesCard'

function Page() {
  const { all_module, fetchModule } = getModuleStore()
  useEffect(() => {
    fetchModule()
  }, [])
  return (
    <>
      <TitleHeaderUI label={'Promotion'}></TitleHeaderUI>
      <div className='px-10'>
        <Accordion
          open={false}
          data={
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {[
                ...new Set(
                  all_module
                    ?.filter((module) => module.promo === Promo.FIRSTYEAR)
                    .map((module) => module.name),
                ),
              ]
                .sort((a, b) => a.localeCompare(b))
                .map((uniqueName) => {
                  const module = all_module?.find(
                    (module) =>
                      module.name === uniqueName &&
                      module.promo === Promo.FIRSTYEAR,
                  )
                  if (!module) return null
                  return <ResourceCard key={uniqueName} module={module} />
                })}
            </div>
          }
          name={'MMI01'}
          icon={<FileTextIcon />}
        />
        <Accordion
          open={false}
          data={
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {[
                ...new Set(
                  all_module
                    ?.filter((module) => module.promo === Promo.SECONDYEAR)
                    .map((module) => module.name),
                ),
              ]
                .sort((a, b) => a.localeCompare(b))
                .map((uniqueName) => {
                  const module = all_module?.find(
                    (module) =>
                      module.name === uniqueName &&
                      module.promo === Promo.SECONDYEAR,
                  )
                  if (!module) return null
                  return <ResourceCard key={uniqueName} module={module} />
                })}
            </div>
          }
          name={'MMI02'}
          icon={<FileTextIcon />}
        />
        <Accordion
          open={false}
          data={
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
              {[
                ...new Set(
                  all_module
                    ?.filter((module) => module.promo === Promo.THIRDYEAR)
                    .map((module) => module.name),
                ),
              ]
                .sort((a, b) => a.localeCompare(b))
                .map((uniqueName) => {
                  const module = all_module?.find(
                    (module) =>
                      module.name === uniqueName &&
                      module.promo === Promo.THIRDYEAR,
                  )
                  if (!module) return null
                  return <ResourceCard key={uniqueName} module={module} />
                })}
            </div>
          }
          name={'MMI03'}
          icon={<FileTextIcon />}
        />
      </div>
    </>
  )
}

export default Page
