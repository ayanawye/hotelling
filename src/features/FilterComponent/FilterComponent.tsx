import { Button, Checkbox, Divider, Popover } from 'antd';
import { useState } from 'react';
import { CloseIcon, FilerIcon2, FilterIcon } from '@shared/assets';
import { SelectWithSearch } from '@shared/ui';
import s from './FilterComponent.module.scss';
import type { SelectOption } from '@shared/types';

export interface FilterConfig {
  name: string;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  mode?: 'multiple' | 'tags';
  maxTagCount?: number | 'responsive';
  allowClear?: boolean;
  type?: 'select' | 'checkbox';
}

interface FilterComponentProps {
  onApply: (filters: Record<string, any>) => void;
  onResetAll: () => void;
  configs: FilterConfig[];
  initialFilters: Record<string, any>;
}

export const FilterComponent = ({
  onApply,
  onResetAll,
  initialFilters,
  configs,
}: FilterComponentProps) => {
  const [open, setOpen] = useState(false);
  const [tempFilters, setTempFilters] =
    useState<Record<string, any>>(initialFilters);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      setTempFilters(initialFilters);
    }
  };

  const handleResetField = (field: string) => {
    setTempFilters((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleApply = () => {
    onApply(tempFilters);
    setOpen(false);
  };

  const handleResetAll = () => {
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

      <div className={s.fields}>
        {configs.map((config) => (
          <div className={s.fieldWrapper} key={config.name}>
            {config.type === 'checkbox' ? (
              <div className={s.switchRow}>
                <Checkbox
                  checked={!!tempFilters[config.name]}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    setTempFilters((prev) => ({
                      ...prev,
                      [config.name]: checked,
                    }));
                  }}
                />
                <span>{config.label}</span>
              </div>
            ) : (
              <>
                <div className={s.fieldLabelRow}>
                  <span className={s.fieldLabel}>{config.label}</span>
                  <Button
                    type='link'
                    size='small'
                    onClick={() => handleResetField(config.name)}
                    className={s.resetLink}
                  >
                    Сбросить
                  </Button>
                </div>
                <SelectWithSearch
                  placeholder={config.placeholder}
                  className={s.select}
                  value={tempFilters[config.name]}
                  onChange={(val) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      [config.name]: val,
                    }))
                  }
                  options={config.options || []}
                  mode={config.mode}
                  maxTagCount={config.maxTagCount || 1}
                  allowClear={config.allowClear || true}
                />
              </>
            )}
          </div>
        ))}
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
