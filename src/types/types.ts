export type Email = {
    id: string;
    from: {
      name: string;
      email: string;
    };
    subject: string;
    short_description: string;
    date: string;
  };