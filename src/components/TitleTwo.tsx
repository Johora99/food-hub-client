import Link from 'next/link';


export default function TitleTwo({title}) {
  return (
  <div className='container w-11/12 mx-auto'>
      <div className=" flex justify-between items-center py-4">
      <h3 className="text-lg md:text-xl font-semibold ">
        {title}
      </h3>
      <Link href={''} className="text-sm md:text-base text-orange-500 font-medium cursor-pointer hover:underline">
        View All
      </Link>
    </div>
      <div className="border-b border-border"></div>
  </div>
  );
}
