# openalex-js

A JavaScript client for the OpenAlex API. OpenAlex is an open and comprehensive catalog of scholarly papers, authors, institutions, and more.

## Installation

```bash
npm install openalex-js
```

## Usage

```javascript
const OpenAlex = require("openalex-js");

// Initialize the client
const openalex = new OpenAlex({
  email: "your.email@example.com", // Optional but recommended
});

// Get a specific work by ID
const work = await openalex.getWork("W2741809807");

// Search for works with filters
const works = await openalex.getWorks({
  filter: "publication_year:2020",
  search: "machine learning",
});

// Get an author by ID
const author = await openalex.getAuthor("A2208157607");

// Search for authors
const authors = await openalex.getAuthors({
  filter: "works_count:>100",
  search: "Smith",
});
```

## API Reference

### Configuration

The OpenAlex client accepts the following configuration options:

- `email` (optional): Your email address for the polite pool
- `perPage` (optional): Number of results per page (default: 25)

### Methods

All methods return promises that resolve to the API response.

#### Works

- `getWork(id)`: Get a single work by ID
- `getWorks(params)`: Get a list of works with optional parameters

#### Authors

- `getAuthor(id)`: Get a single author by ID
- `getAuthors(params)`: Get a list of authors with optional parameters

#### Sources

- `getSource(id)`: Get a single source by ID
- `getSources(params)`: Get a list of sources with optional parameters

#### Institutions

- `getInstitution(id)`: Get a single institution by ID
- `getInstitutions(params)`: Get a list of institutions with optional parameters

#### Topics

- `getTopic(id)`: Get a single topic by ID
- `getTopics(params)`: Get a list of topics with optional parameters

#### Publishers

- `getPublisher(id)`: Get a single publisher by ID
- `getPublishers(params)`: Get a list of publishers with optional parameters

#### Funders

- `getFunder(id)`: Get a single funder by ID
- `getFunders(params)`: Get a list of funders with optional parameters

### Parameters

All list methods accept an optional parameters object that can include:

- `filter`: Filter results using OpenAlex syntax
- `search`: Search within results
- `sort`: Sort results
- `page`: Page number for pagination
- `per_page`: Results per page (overrides constructor setting)

## Examples

```javascript
// Get works from a specific institution
const works = await openalex.getWorks({
  filter: "institutions.id:I136199984", // Harvard University
  sort: "cited_by_count:desc",
});

// Search for authors at a specific institution
const authors = await openalex.getAuthors({
  filter: "last_known_institution.id:I136199984",
  search: "biology",
});

// Get highly-cited papers from 2023
const papers = await openalex.getWorks({
  filter: "publication_year:2023,cited_by_count:>100",
});
```

## Rate Limits

OpenAlex has a rate limit of 100,000 requests per day and 10 requests per second. For better performance, provide your email address when initializing the client to get into the "polite pool."

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
