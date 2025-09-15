import React from 'react';
import Image from 'next/image';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { DataCategory } from '../../../../types/AllCategory';

interface Props {
  params: {
    id: string;
  };
}

// لو عايز page تتعامل مع dynamic route لازم تكون Server Component
export default async function CategoryPage({ params }: Props) {
  // ✅ احنا هنا منتظرين params متجهز
  const categoryId = await params.id; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${categoryId}`, {
    next: { revalidate: 10 } // optional caching
  });
  const data: { data: DataCategory } = await res.json();
  const category = data.data;

  return (
    <div className='p-5 flex flex-wrap justify-center items-center gap-3'>
        <div className='w-1/2'>

      <Card>
        <CardContent className='flex justify-center items-center'>
          <Image
            src={category.image}
            alt={category.name}
            width={400}
            height={300}
            className='w-3/4  h-55 object-cover rounded-md'
          />
        </CardContent>
        
      </Card>
        </div>
        <div className='w-1/2 '>
         <CardHeader>
          <CardTitle>{category.name}</CardTitle>
          <CardDescription className='my-5'>Slug: {category.slug}</CardDescription>
        </CardHeader>
        <CardFooter>
          <p>Created at: {new Date(category.createdAt).toLocaleDateString()}</p>
          <p>Updated at: {new Date(category.updatedAt).toLocaleDateString()}</p>
        </CardFooter>

        </div>
    </div>
  );
}
