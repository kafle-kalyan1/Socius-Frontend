import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/extracomponents/ui/tabs'
import React from 'react'
import ReportPost from './Reports/Posts/ReportPost'
import { SeparatorHorizontal } from 'lucide-react'
import { Separator } from '@/extracomponents/ui/separator'
import Deepfake from './Reports/Deepfake/Deepfake'

const main = () => {
  return (
    <div>
      {/* <Tabs defaultValue="account" className="w-full mt-4 flex flex-col justify-center items-center">
  <TabsList>
    <TabsTrigger className="text-xl p-2" value="account">DeepFake</TabsTrigger>
    <Separator />
    <TabsTrigger className="text-xl p-2" value="password">Reports</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><Deepfake/>
  </TabsContent>
  <TabsContent value="password" className="w-full"> */}
   <>
   <ReportPost/>
   </>
  {/* </TabsContent>
</Tabs> */}

    </div>
  )
}

export default main
