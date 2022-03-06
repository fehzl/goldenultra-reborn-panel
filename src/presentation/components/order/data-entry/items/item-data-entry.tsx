import { useQuery } from 'react-query';
import { DeviceModel } from '@/domain/models';
import { useState } from 'react';
import { makeRemoteLoadDeviceList } from '@/main/factories/usecases';
import Select from '../../../input/select';

interface Props {
  items: any[];
  setItems: (items: any[]) => void;
  selectInputRef: React.RefObject<any>;
}

export function OrderItemDataEntry({ items, setItems, selectInputRef }: Props) {
  const remoteLoadDeviceList = makeRemoteLoadDeviceList();

  const [search, setSearch] = useState(``);

  const { data } = useQuery(
    [`devices`, search],
    async () => await remoteLoadDeviceList.loadAll({ search, limit: 5 }),
    { keepPreviousData: true },
  );

  const alreadyExists = (code: string): boolean => {
    return items.some((item) => item.device.code === code);
  };

  const chooseItem = (device: DeviceModel): void => {
    if (alreadyExists(device.code)) {
      return;
    }

    const item = {
      device,
      quantity: null,
      device_price: device.un_price,
    };
    setItems([...items, item]);
  };

  return (
    <>
      {data && (
        <Select
          data={data}
          label="Inserir Item"
          search={search}
          setSearch={setSearch}
          ref={selectInputRef}
          chooseItem={chooseItem}
          optionLabel={[`code`, `exhibition_description`]}
        />
      )}
    </>
  );
}
