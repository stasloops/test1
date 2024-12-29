type GetTableProps = {
  limit?: number;
  offset?: number;
  search?: string;
};

export const httpGetTable = async ({ limit, offset, search }: GetTableProps) => {
  const searchParams = new URLSearchParams();
  if (limit) searchParams.set('limit', String(limit));
  if (offset) searchParams.set('offset', String(offset));
  if (search) searchParams.set('search', search);

  const token = localStorage.getItem('token') || sessionStorage.getItem('token');

  const response = await fetch(`/api/table?${searchParams.toString()}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
