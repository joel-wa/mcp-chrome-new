/**
 * Content index manager (stub)
 * Minimal stub implementation after semantic functionality removal
 */

import { TextChunker } from './text-chunker';

export interface IndexingOptions {
  autoIndex?: boolean;
  maxChunksPerPage?: number;
  skipDuplicates?: boolean;
}

export class ContentIndexer {
  private textChunker: TextChunker;
  private isInitialized = false;
  private indexedPages = new Set<string>();
  private readonly options: Required<IndexingOptions>;

  constructor(options?: IndexingOptions) {
    this.options = {
      autoIndex: true,
      maxChunksPerPage: 50,
      skipDuplicates: true,
      ...options,
    };

    this.textChunker = new TextChunker();
  }

  /**
   * Initialize content indexer (stub)
   */
  public async initialize(): Promise<void> {
    console.log('ContentIndexer: Semantic functionality has been removed');
    this.isInitialized = true;
  }

  /**
   * Index content of specified tab (stub)
   */
  public async indexTabContent(tabId: number): Promise<void> {
    console.log(`ContentIndexer: Semantic indexing disabled for tab ${tabId}`);
  }

  /**
   * Remove tab index (stub)
   */
  public async removeTabIndex(tabId: number): Promise<void> {
    console.log(`ContentIndexer: Semantic indexing disabled for tab ${tabId}`);
  }

  /**
   * Search content (stub)
   */
  public async searchContent(query: string, limit?: number): Promise<any[]> {
    console.log(`ContentIndexer: Semantic search disabled for query: ${query}`);
    return [];
  }

  /**
   * Clear all indexes (stub)
   */
  public async clearAllIndexes(): Promise<void> {
    console.log('ContentIndexer: Semantic indexing disabled');
    this.indexedPages.clear();
  }

  /**
   * Get statistics (stub)
   */
  public getStats() {
    return {
      totalDocuments: 0,
      totalTabs: 0,
      indexSize: 0,
      indexedPages: 0,
      isInitialized: this.isInitialized,
      semanticEngineReady: false,
      semanticEngineInitializing: false,
    };
  }

  /**
   * Check if semantic engine is ready (stub)
   */
  public isSemanticEngineReady(): boolean {
    return false;
  }

  /**
   * Check if semantic engine is initializing (stub)
   */
  public isSemanticEngineInitializing(): boolean {
    return false;
  }

  /**
   * Start semantic engine initialization (stub)
   */
  public startSemanticEngineInitialization(): void {
    console.log('ContentIndexer: Semantic engine initialization disabled');
  }

  private shouldIndexUrl(url: string): boolean {
    return (
      !url.startsWith('chrome://') &&
      !url.startsWith('chrome-extension://') &&
      !url.startsWith('edge://') &&
      !url.startsWith('about:')
    );
  }
}

// Global instance (stub)
let globalContentIndexer: ContentIndexer | null = null;

export function getGlobalContentIndexer(): ContentIndexer {
  if (!globalContentIndexer) {
    globalContentIndexer = new ContentIndexer();
  }
  return globalContentIndexer;
}
