import React from 'react'
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Internship } from '@/app/models/Internship'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from '@/components/ui/select'

interface InternshipFormProps {
  onSubmit: SubmitHandler<Internship>
}

const InternshipForm: React.FC<InternshipFormProps> = ({ onSubmit }) => {
  const methods = useForm<Internship>()

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          control={methods.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intitulé du stage</FormLabel>
              <FormControl>
                <Input placeholder='Intitulé du stage' {...field} />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.title && 'Ce champ est obligatoire'}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='type'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d&apos;expériences</FormLabel>
              <FormControl>
                <Controller
                  control={methods.control}
                  name='type'
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un type d'expériences" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='STAGE'>Stage</SelectItem>
                        <SelectItem value='ALTERNANCE'>Alternance</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.weekCount &&
                  'Ce champ est obligatoire'}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormLabel>commentaires</FormLabel>
              <FormControl>
                <Input placeholder='commentaires' {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='weekCount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de semaines</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  placeholder='Nombre de semaines'
                  {...field}
                  max={30}
                />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.weekCount &&
                  'Ce champ est obligatoire'}
              </FormMessage>
            </FormItem>
          )}
        />
        <FormField
          control={methods.control}
          name='years'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année</FormLabel>
              <FormControl>
                <Input type='number' placeholder='Année' {...field} />
              </FormControl>
              <FormMessage>
                {methods.formState.errors.years && 'Ce champ est obligatoire'}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex space-x-4'>
          <button
            className='px-4 py-2 my-4 bg-primary-blue text-white rounded hover:bg-primary-blue-hover transition-colors duration-300'
            type='submit'
          >
            Ajouter un stage
          </button>
          <button
            className='px-4 py-2 my-4 bg-red-500 text-white rounded hover:bg-red-700 transition-colors duration-300'
            type='button'
            onClick={() => methods.reset()}
          >
            Réinitialiser
          </button>
        </div>
      </form>
    </FormProvider>
  )
}

export default InternshipForm
