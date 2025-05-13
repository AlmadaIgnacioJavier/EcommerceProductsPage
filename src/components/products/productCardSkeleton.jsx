import { Card, CardBody } from "@material-tailwind/react";

export default function ProductCardSkeleton() {
  return (
    <Card className="max-w-xs m-2 rounded-2xl shadow-sm border border-gray-200 bg-white animate-pulse">
      <div className="h-52 bg-gray-200 rounded-t-2xl" />
      <CardBody className="pb-4">
        <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
        <div className="h-5 w-1/2 bg-gray-200 rounded mb-3" />
        <div className="h-10 w-full bg-gray-300 rounded-lg" />
      </CardBody>
    </Card>
  );
}