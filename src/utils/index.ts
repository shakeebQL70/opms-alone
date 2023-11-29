import {
  differenceInDays,
  differenceInMilliseconds,
  format,
  formatDuration,
} from "date-fns";

export const getAutocompleteFilterData = (id: string, targetArray: any[]) => {
  if (!id) return null;
  const d = targetArray.find((item) => String(item.id) === String(id));
  if (!d) return null;
  return d;
};

export const getSelectFilterData = (id: string, targetArray: any[]) => {
  if (!id) return "";
  const d = targetArray.find((item) => String(item.id) === "1").id;
  if (!d) return "";
  return d;
};

export const getSelectFilterDataByValue = (
  value: string,
  targetArray: any[]
) => {
  if (!value) return "";
  const d = targetArray.find((item) => item.value === value)?.value;
  if (!d) return "";
  return d;
};

export const formatDateYYYYMMDD = (dateString: string) => {
  return format(new Date(dateString || new Date()), "yyyy-MM-dd");
};

export function formatDateAndTime(date: string, time: string) {
  //example '2023-11-13T00:00:00.000Z'
  return new Date(`${date} ${time}`).toISOString();
}

export function getTimeInAMPM(dateString: string) {
  const dateObject = new Date(dateString);

  // Format the time using date-fns with "h:mm a" format
  const formattedTime = format(dateObject, "hh:mm a");

  return formattedTime;
}

type TWarranty = "Active" | "Inactive";

export const getWarrantyStatus = (
  warrantyEndDate: string,
  purchaseDate: string
): TWarranty => {
  return differenceInDays(new Date(warrantyEndDate), new Date()) > 1
    ? "Active"
    : "Inactive";
};
