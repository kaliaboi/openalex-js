// src/types/index.ts

export interface OpenAlexConfig {
    email?: string;
    perPage?: number;
  }
  
  export interface PaginationParams {
    page?: number;
    per_page?: number;
    cursor?: string;
  }
  
  export interface FilterParams extends PaginationParams {
    filter?: string;
    search?: string;
    sort?: string;
  }
  
  export interface Meta {
    count: number;
    db_response_time_ms: number;
    page: number;
    per_page: number;
    next_cursor?: string;
  }
  
  export interface DehydratedWork {
    id: string;
    display_name: string;
    doi?: string;
  }
  
  export interface DehydratedAuthor {
    id: string;
    display_name: string;
    orcid?: string;
  }
  
  export interface DehydratedInstitution {
    id: string;
    display_name: string;
    type: string;
    country_code?: string;
    ror?: string;
  }
  
  export interface OpenAccess {
    is_oa: boolean;
    oa_status: 'gold' | 'green' | 'bronze' | 'hybrid' | 'closed';
    oa_url?: string;
  }
  
  export interface Authorship {
    author: DehydratedAuthor;
    institutions: DehydratedInstitution[];
    position: 'first' | 'middle' | 'last';
    raw_affiliation_string?: string;
  }
  
  export interface Work {
    id: string;
    doi?: string;
    title: string;
    display_name: string;
    publication_year?: number;
    publication_date?: string;
    type: string;
    cited_by_count: number;
    is_retracted: boolean;
    is_parallel_publication: boolean;
    cited_by_api_url: string;
    abstract_inverted_index?: Record<string, number[]>;
    authorships: Authorship[];
    open_access: OpenAccess;
  }
  
  export interface WorksResponse {
    meta: Meta;
    results: Work[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }
  
  export interface Author {
    id: string;
    orcid?: string;
    display_name: string;
    display_name_alternatives?: string[];
    works_count: number;
    cited_by_count: number;
    last_known_institution?: DehydratedInstitution;
  }
  
  export interface AuthorsResponse {
    meta: Meta;
    results: Author[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }
  
  export interface Institution {
    id: string;
    display_name: string;
    type: string;
    country_code?: string;
    works_count: number;
    cited_by_count: number;
    ror?: string;
    display_name_acronyms?: string[];
  }
  
  export interface InstitutionsResponse {
    meta: Meta;
    results: Institution[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }
  
  export interface Topic {
    id: string;
    display_name: string;
    description?: string;
    works_count: number;
    cited_by_count: number;
  }
  
  export interface TopicsResponse {
    meta: Meta;
    results: Topic[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }
  
  export interface Publisher {
    id: string;
    display_name: string;
    alternate_titles?: string[];
    works_count: number;
    cited_by_count: number;
    hierarchy_level: number;
    country_codes?: string[];
  }
  
  export interface PublishersResponse {
    meta: Meta;
    results: Publisher[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }
  
  export interface Funder {
    id: string;
    display_name: string;
    alternate_titles?: string[];
    description?: string;
    works_count: number;
    cited_by_count: number;
    country_code?: string;
    grants_count?: number;
  }
  
  export interface FundersResponse {
    meta: Meta;
    results: Funder[];
    group_by?: Array<{
      key: string;
      key_display_name: string;
      count: number;
    }>;
  }