"use client";
import TitleHeaderUI from "@/app/components/ui/TitleHeaderUI";
import { Internship } from "@/app/models/Internship";
import { useInternshipStore } from "@/app/store/Internship.store";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

const PostInternship = () => {
  const param = useSearchParams();
  const numEtu = param.get("numEtu");
  const { addInternship } = useInternshipStore();
  const router = useRouter();
  if (!numEtu) router.back();
  const methods = useForm<Internship>();

  const onSubmit: SubmitHandler<Internship> = (data) => {
    console.log(data);
    if (numEtu) addInternship(numEtu, data).then(()=>{
      router.push(`/internship/internship-management/?numEtu=${numEtu}`);
    });
  };

  return (
    <>
      <TitleHeaderUI label="Ajouter un stage" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormField
            control={methods.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Intitulé du stage</FormLabel>
                <FormControl>
                  <Input placeholder="Intitulé du stage" {...field} />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.title && "Ce champ est obligatoire"}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commentaries</FormLabel>
                <FormControl>
                  <Input placeholder="Commentaries" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type (STAGE ou ALTERNANCE)</FormLabel>
                <FormControl>
                  <Input placeholder="Type de contrat" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="weekCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de semaines</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nombre de semaines"
                    {...field}
                  />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.weekCount && "Ce champ est obligatoire"}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={methods.control}
            name="years"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Année</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Année" {...field} />
                </FormControl>
                <FormMessage>
                  {methods.formState.errors.years && "Ce champ est obligatoire"}
                </FormMessage>
              </FormItem>
            )}
          />
          <button type="submit">Ajouter un stage</button>
        </form>
      </FormProvider>
    </>
  );
};

export default PostInternship;