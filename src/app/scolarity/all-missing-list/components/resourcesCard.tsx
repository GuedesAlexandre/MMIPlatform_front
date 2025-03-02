import { useRouter } from 'next/navigation'
import { FileTextIcon } from '@radix-ui/react-icons'
import { Module } from '@/app/users/models/user.model'

const ResourceCard = ({ module }: { module: Module }) => {
  const router = useRouter()
  const handleClickNavigation = () => {
    router.push(`/scolarity/ressources-sheet?moduleName=${module.name}`)
  }

  return (
    <div className='mt-5 w-full mx-auto border border-placeholder-color rounded-md'>
      <div
        className={
          module.promo === 'MMI01'
            ? 'bg-success text-background-color flex flex-row justify-between pt-44 px-5'
            : module.promo === 'MMI02'
            ? 'bg-[#E83583] text-background-color flex flex-row justify-between pt-44 px-5'
            : 'bg-[#8B4A97] text-background-color flex flex-row justify-between pt-44 px-5'
        }
      >
        <p className='pb-3'>{module.promo}</p>
      </div>
      <div className='px-4 flex flex-row justify-between items-center py-5'>
        <p className='w-3/4'>{module?.name}</p>
        <div className='flex justify-end h-fit'>
          <p
            className='cursor-pointer border border-primary-blue p-1 rounded-sm'
            onClick={handleClickNavigation}
          >
            <FileTextIcon className='text-primary-blue size-5' />
          </p>
        </div>
      </div>
    </div>
  )
}
export default ResourceCard
