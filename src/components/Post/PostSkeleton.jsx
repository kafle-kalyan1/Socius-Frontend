import { Skeleton, Card } from 'antd';

const PostSkeleton = () => {
  return (
    <Card className="text-black rounded-lg  w-3/6 min-h-[300px] h-fit max-w-[900px] space-y-6 p-10 mb-4">
      
      <div className="flex items-center space-x-2">
        <Skeleton.Avatar active size={24} className="w-8 h-8" />

        <div className="space-y-1 w-full">
          <Skeleton title={{ width: '10%' }} paragraph={{ rows: 1 }} active />
          
          <Skeleton title={{ width: '10%' }} paragraph={{ rows: 1 }} active />
        </div>
      </div>

      <Skeleton paragraph={{ rows: 4 }} active className="my-4" />
      
      <Skeleton.Image className="h-32 w-full rounded-lg mb-2" />
      
      <div className="flex justify-between">
        <Skeleton.Button className="flex-1" active />
        <Skeleton.Button className="flex-1" active />
        <Skeleton.Button className="flex-1" active />
      </div>

    </Card>
  );
}

export default PostSkeleton;