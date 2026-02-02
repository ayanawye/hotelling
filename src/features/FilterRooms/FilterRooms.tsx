import { Button, Divider, Popover } from 'antd';
import { useState } from 'react';
import { CloseIcon, FilerIcon2, FilterIcon } from '@shared/assets';
import { SelectWithSearch } from '@shared/ui';
import s from './FilterRooms.module.scss';

interface FilterRoomsProps {
  onApply: (filters: {
    enclosure?: string;
    floor?: string;
    roomType?: string;
  }) => void;
  onResetAll: () => void;
  initialFilters: { enclosure?: string; floor?: string; roomType?: string };
}

export const FilterRooms = ({
  onApply,
  onResetAll,
  initialFilters,
}: FilterRoomsProps) => {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState(initialFilters);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setTempFilters(initialFilters);
    }
  };

  const handleResetField = (field: keyof typeof tempFilters) => {
    setTempFilters((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleApply = () => {
    onApply(tempFilters);
    setOpen(false);
  };

  const handleResetAll = () => {
    const resetFilters = {
      enclosure: undefined,
      floor: undefined,
      roomType: undefined,
    };
    setTempFilters(resetFilters);
    onResetAll();
    setOpen(false);
  };

  const content = (
    <div className={s.filterContent}>
      <div className={s.header}>
        <div className={s.title}>
          <FilerIcon2 /> <p>Фильтр</p>
        </div>
        <Button
          type='text'
          icon={<CloseIcon />}
          onClick={() => setOpen(false)}
        />
      </div>

      <div className={s.fieldWrapper}>
        <div className={s.fieldLabelRow}>
          <span className={s.fieldLabel}>Выберите корпус</span>
          <Button
            type='link'
            size='small'
            onClick={() => handleResetField('enclosure')}
            className={s.resetLink}
          >
            Сбросить
          </Button>
        </div>
        <SelectWithSearch
          placeholder='Корпус'
          className={s.select}
          value={tempFilters.enclosure}
          onChange={(val) =>
            setTempFilters((prev) => ({ ...prev, enclosure: val as string }))
          }
          options={[
            { value: 'Корпус 1', label: 'Корпус 1' },
            { value: 'Корпус 2', label: 'Корпус 2' },
            { value: 'Корпус 3', label: 'Корпус 3' },
          ]}
        />
      </div>

      <div className={s.fieldWrapper}>
        <div className={s.fieldLabelRow}>
          <span className={s.fieldLabel}>Выберите этаж</span>
          <Button
            type='link'
            size='small'
            onClick={() => handleResetField('floor')}
            className={s.resetLink}
          >
            Сбросить
          </Button>
        </div>
        <SelectWithSearch
          placeholder='Этаж'
          className={s.select}
          value={tempFilters.floor}
          onChange={(val) =>
            setTempFilters((prev) => ({ ...prev, floor: val as string }))
          }
          options={[
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
          ]}
        />
      </div>

      <div className={s.fieldWrapper}>
        <div className={s.fieldLabelRow}>
          <span className={s.fieldLabel}>Выберите тип номера</span>
          <Button
            type='link'
            size='small'
            onClick={() => handleResetField('roomType')}
            className={s.resetLink}
          >
            Сбросить
          </Button>
        </div>
        <SelectWithSearch
          placeholder='Тип номера'
          className={s.select}
          value={tempFilters.roomType}
          onChange={(val) =>
            setTempFilters((prev) => ({ ...prev, roomType: val as string }))
          }
          options={[
            { value: 'Стандарт', label: 'Стандарт' },
            { value: 'Люкс', label: 'Люкс' },
            { value: 'Делюкс', label: 'Делюкс' },
          ]}
        />
      </div>

      <Divider className={s.divider} />

      <div className={s.footer}>
        <Button onClick={handleResetAll} className={s.resetAllBtn}>
          Сбросить все
        </Button>
        <Button type='primary' onClick={handleApply} className={s.applyBtn}>
          Применить
        </Button>
      </div>
    </div>
  );

  return (
    <Popover
      content={content}
      trigger='click'
      open={open}
      onOpenChange={handleOpenChange}
      placement='bottomRight'
      overlayClassName={s.popoverOverlay}
    >
      <Button className={s.filterTrigger}>
        <FilterIcon /> Фильтр
      </Button>
    </Popover>
  );
};
