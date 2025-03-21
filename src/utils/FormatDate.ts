export const formatDate = (
    date: string | Date,
    locale: string = "en-GB",
    options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }
  ): string => {
    return new Date(date).toLocaleDateString(locale, options);
  };
  