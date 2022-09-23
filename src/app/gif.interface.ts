// For brevity sake I'm just doing a summary of the data

export interface GiphyResult {
  data: GifData[];
  pagination: {
    count: number;
    offset: number;
  };
}

export interface GifData {
  images: {
    fixed_width: {
      url: string;
    };
  };
  title: string;
}

export interface SearchReqeust {
  searchTerm: string;
  offset: number;
  pageSize: number;
}
