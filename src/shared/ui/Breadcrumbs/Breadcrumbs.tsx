import { navigationConfig } from '@app/router/config/navigation.tsx';
import { RightArrow } from '@shared/assets';
import { useStyles } from '@shared/styles';
import type { FC } from 'react';
import { useLocation } from 'react-router-dom';

export const Breadcrumbs: FC = () => {
  const { breadCrumbsStyle, mainBreadCrumbsStyle, secondBreadCrumbsStyle } =
    useStyles();
  const { pathname } = useLocation();

  const findBreadcrumbs = () => {
    for (const item of navigationConfig) {
      if (item.path === pathname) {
        return [{ label: item.label, isMain: true }];
      }
      if (item.children) {
        const child = item.children.find((c) => c.path === pathname);
        if (child) {
          return [
            { label: item.label, isMain: true },
            { label: child.label, isMain: false },
          ];
        }
      }
    }
    return [];
  };

  const breadcrumbs = findBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <div style={breadCrumbsStyle}>
      {breadcrumbs.map((bc, index) => (
        <span key={bc.label} style={breadCrumbsStyle}>
          <span
            style={bc.isMain ? mainBreadCrumbsStyle : secondBreadCrumbsStyle}
          >
            {bc.label}
          </span>
          {index < breadcrumbs.length - 1 && <RightArrow />}
        </span>
      ))}
    </div>
  );
};
