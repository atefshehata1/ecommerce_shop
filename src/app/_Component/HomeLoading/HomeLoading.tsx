import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
  return (<>
  
  

  <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-12 mt-5">
   {
              Array.from({ length:6 }).map((el,i) =>{
        return  <div key={i} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
    })
    
}
</div>
    </>)
}
