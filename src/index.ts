// src/index.ts
import fetch from "cross-fetch";
import type {
  OpenAlexConfig,
  FilterParams,
  WorksResponse,
  AuthorsResponse,
  InstitutionsResponse,
  TopicsResponse,
  PublishersResponse,
  FundersResponse,
  Work,
  Author,
  Institution,
  Topic,
  Publisher,
  Funder,
} from "./types/index.js";

export * from "./types/index.js";

export class OpenAlex {
  private baseUrl: string;
  private email?: string;
  private perPage: number;

  constructor(config: OpenAlexConfig = {}) {
    this.baseUrl = "https://api.openalex.org";
    this.email = config.email;
    this.perPage = config.perPage || 25;
  }

  private _buildUrl(
    endpoint: string,
    params: Record<string, any> = {}
  ): string {
    const url = new URL(`${this.baseUrl}/${endpoint}`);

    if (this.email) {
      url.searchParams.append("mailto", this.email);
    }

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  private async _makeRequest<T>(
    endpoint: string,
    params: Record<string, any> = {}
  ): Promise<T> {
    const url = this._buildUrl(endpoint, params);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `OpenAlex API error: ${response.status} ${response.statusText}`
        );
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new Error("Network error: Unable to connect to OpenAlex API");
      }
      throw error instanceof Error
        ? error
        : new Error("Unknown error occurred while fetching from OpenAlex API");
    }
  }

  // Works endpoints
  async getWork(id: string): Promise<Work> {
    return this._makeRequest<Work>(`works/${id}`);
  }

  async getWorks(params: FilterParams = {}): Promise<WorksResponse> {
    return this._makeRequest<WorksResponse>("works", {
      per_page: this.perPage,
      ...params,
    });
  }

  // Authors endpoints
  async getAuthor(id: string): Promise<Author> {
    return this._makeRequest<Author>(`authors/${id}`);
  }

  async getAuthors(params: FilterParams = {}): Promise<AuthorsResponse> {
    return this._makeRequest<AuthorsResponse>("authors", {
      per_page: this.perPage,
      ...params,
    });
  }

  // Institutions endpoints
  async getInstitution(id: string): Promise<Institution> {
    return this._makeRequest<Institution>(`institutions/${id}`);
  }

  async getInstitutions(
    params: FilterParams = {}
  ): Promise<InstitutionsResponse> {
    return this._makeRequest<InstitutionsResponse>("institutions", {
      per_page: this.perPage,
      ...params,
    });
  }

  // Topics endpoints
  async getTopic(id: string): Promise<Topic> {
    return this._makeRequest<Topic>(`topics/${id}`);
  }

  async getTopics(params: FilterParams = {}): Promise<TopicsResponse> {
    return this._makeRequest<TopicsResponse>("topics", {
      per_page: this.perPage,
      ...params,
    });
  }

  // Publishers endpoints
  async getPublisher(id: string): Promise<Publisher> {
    return this._makeRequest<Publisher>(`publishers/${id}`);
  }

  async getPublishers(params: FilterParams = {}): Promise<PublishersResponse> {
    return this._makeRequest<PublishersResponse>("publishers", {
      per_page: this.perPage,
      ...params,
    });
  }

  // Funders endpoints
  async getFunder(id: string): Promise<Funder> {
    return this._makeRequest<Funder>(`funders/${id}`);
  }

  async getFunders(params: FilterParams = {}): Promise<FundersResponse> {
    return this._makeRequest<FundersResponse>("funders", {
      per_page: this.perPage,
      ...params,
    });
  }
}

export default OpenAlex;
