export * from './types';
export * from './types/constants';

export {
  useGetHotelFloorsQuery,
  useCreateNewHotelFloorMutation,
  useDeleteHotelFloorMutation,
  useGetHotelFloorByIDQuery,
  usePatchHotelFloorMutation,
} from './api/floorApi';

export {
  useGetHotelEnclosuresQuery,
  useCreateNewHotelEnclosureMutation,
  useDeleteHotelEnclosureMutation,
  useGetHotelEnclosureByIDQuery,
  usePatchHotelEnclosureMutation,
} from './api/enclosureApi';

export {
  useGetHotelRoomsTypesQuery,
  useGetHotelRoomsTypeByIDQuery,
  useCreateHotelRoomsTypeMutation,
  useDeleteHotelRoomsTypeMutation,
  usePatchHotelRoomsTypeMutation,
} from './api/roomsTypeApi';

export {
  useGetHotelRoomsStatusQuery,
  useGetHotelRoomStatusByIDQuery,
  useCreateHotelRoomsStatusMutation,
  usePatchHotelRoomStatusMutation,
  useDeleteHotelRoomStatusMutation,
} from './api/roomsStatus';

export {
  useGetHotelRoomStocksQuery,
  useGetHotelRoomStockByIDQuery,
  useCreateHotelRoomStockMutation,
  usePatchHotelRoomStockMutation,
  useDeleteHotelRoomStockMutation,
} from './api/roomsStockApi';
