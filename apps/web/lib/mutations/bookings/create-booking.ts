import type { BookingCreateBody } from "@calcom/prisma/zod-utils";

import { post } from "@lib/core/http/fetch-wrapper";
import type { BookingResponse } from "@lib/types/booking";

type BookingCreateBodyForMutation = Omit<BookingCreateBody, "location">;
const createBooking = async (data: BookingCreateBodyForMutation) => {
  const response = await post<BookingCreateBodyForMutation, BookingResponse>("/api/book/event", data);

  return response;
};

export default createBooking;
