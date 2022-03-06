import Image from 'next/image';
import { BsThreeDots } from 'react-icons/bs';
import { DeviceModel } from '@/domain/models';

interface Props {
  device: DeviceModel;
}

export default function ItemsCard({ device }: Props) {
  return (
    <div className="flex flex-col space-y-4 p-8 items-center justify-center bg-gray-100 rounded-lg">
      <div className="flex flex-row justify-between w-full text-center text-gray-600">
        <div className="w-6 h-6 rounded-lg border-2 border-gray-200 bg-white"></div>
        <div>
          <BsThreeDots className="text-gray-300" />
        </div>
      </div>
      <div className="flex w-32 h-32 bg-white rounded-full items-center justify-center">
        {device.images && (
          <div>
            <Image
              alt="item"
              src={device.images}
              layout="intrinsic"
              width={90}
              height={90}
              objectFit="contain"
            />
          </div>
        )}
      </div>
      <div className="text-center text-blue-400 font-bold">{device.code}</div>
    </div>
  );
}
