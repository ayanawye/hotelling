import { navigationConfig } from '@app/router/config/navigation.tsx';
import { RightArrow } from '@shared/assets';
import { useStyles } from '@shared/styles';
import type { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Breadcrumbs: FC = () => {
  const { breadCrumbsStyle, mainBreadCrumbsStyle, secondBreadCrumbsStyle } =
    useStyles();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const findBreadcrumbs = () => {
    const result: { label: string; isMain: boolean; path?: string }[] = [];

    const matchPath = (path: string, targetPath: string) => {
      if (!path) return false;
      const cleanPath = path.replace(/:[^\/]+/g, '[^/]+');
      const regex = new RegExp(`^${cleanPath}$`);
      return regex.test(targetPath);
    };

    const search = (
      items: typeof navigationConfig,
      targetPath: string,
    ): boolean => {
      for (const item of items) {
        if (item.path && matchPath(item.path, targetPath)) {
          result.push({
            label: item.label,
            isMain: result.length === 0,
            path: item.path,
          });
          return true;
        }
        if (item.children) {
          if (search(item.children, targetPath)) {
            result.unshift({
              label: item.label,
              isMain: result.length === 0,
              path: item.path,
            });
            result.forEach((bc, idx) => {
              bc.isMain = idx === 0;
            });
            return true;
          }
        }
      }
      return false;
    };

    search(navigationConfig, pathname);
    return result;
  };

  const breadcrumbs = findBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <div style={breadCrumbsStyle}>
      {breadcrumbs.map((bc, index) => {
        const isClickable =
          index > 0 && index < breadcrumbs.length - 1 && bc.path;

        return (
          <span key={bc.label} style={breadCrumbsStyle}>
            <span
              style={{
                ...(bc.isMain ? mainBreadCrumbsStyle : secondBreadCrumbsStyle),
                cursor: isClickable ? 'pointer' : 'default',
              }}
              onClick={isClickable ? () => navigate(bc.path!) : undefined}
            >
              {bc.label}
            </span>
            {index < breadcrumbs.length - 1 && <RightArrow />}
          </span>
        );
      })}
    </div>
  );
};
