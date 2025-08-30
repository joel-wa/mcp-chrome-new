/**
 * Simple text-based tab content search tool
 * Performs keyword matching without semantic functionality
 */

import { createErrorResponse, ToolResult } from '@/common/tool-handler';
import { BaseBrowserToolExecutor } from '../base-browser';
import { TOOL_NAMES } from 'chrome-mcp-shared';
import { ERROR_MESSAGES } from '@/common/constants';

interface TextSearchResult {
  tabId: number;
  url: string;
  title: string;
  score: number;
  matchedSnippet: string;
  timestamp: number;
}

/**
 * Tool for text-based search of tab content using keyword matching
 */
class TextSearchTabsContentTool extends BaseBrowserToolExecutor {
  name = TOOL_NAMES.BROWSER.SEARCH_TABS_CONTENT;

  async execute(args: { query: string }): Promise<ToolResult> {
    try {
      const { query } = args;

      if (!query || query.trim().length === 0) {
        return createErrorResponse(
          ERROR_MESSAGES.INVALID_PARAMETERS + ': Query parameter is required and cannot be empty',
        );
      }

      console.log(`TextSearchTabsContentTool: Starting text search with query: "${query}"`);

      // Get all tabs
      const windows = await chrome.windows.getAll({ populate: true });
      const allTabs: chrome.tabs.Tab[] = [];

      for (const window of windows) {
        if (window.tabs) {
          allTabs.push(...window.tabs);
        }
      }

      const validTabs = allTabs.filter(
        (tab) =>
          tab.id &&
          tab.url &&
          !tab.url.startsWith('chrome://') &&
          !tab.url.startsWith('chrome-extension://') &&
          !tab.url.startsWith('edge://') &&
          !tab.url.startsWith('about:'),
      );

      const searchResults: TextSearchResult[] = [];
      const queryLower = query.toLowerCase();

      // Simple text matching on title and URL
      for (const tab of validTabs) {
        let score = 0;
        let matchedSnippet = '';

        // Check title match
        if (tab.title && tab.title.toLowerCase().includes(queryLower)) {
          score += 2;
          matchedSnippet = tab.title;
        }

        // Check URL match
        if (tab.url && tab.url.toLowerCase().includes(queryLower)) {
          score += 1;
          if (!matchedSnippet) {
            matchedSnippet = tab.url;
          }
        }

        if (score > 0) {
          searchResults.push({
            tabId: tab.id!,
            url: tab.url!,
            title: tab.title || 'Untitled',
            score,
            matchedSnippet,
            timestamp: Date.now(),
          });
        }
      }

      // Sort by score
      const sortedResults = searchResults.sort((a, b) => b.score - a.score).slice(0, 10);

      const result = {
        success: true,
        totalTabsSearched: validTabs.length,
        matchedTabsCount: sortedResults.length,
        vectorSearchEnabled: false,
        indexStats: {
          totalDocuments: 0,
          totalTabs: validTabs.length,
          indexedPages: 0,
          semanticEngineReady: false,
          semanticEngineInitializing: false,
        },
        matchedTabs: sortedResults.map((result) => ({
          tabId: result.tabId,
          url: result.url,
          title: result.title,
          semanticScore: result.score / 2, // Normalize to 0-1 scale
          matchedSnippets: [result.matchedSnippet],
          chunkSource: 'title/url',
          timestamp: result.timestamp,
        })),
      };

      console.log(
        `TextSearchTabsContentTool: Found ${sortedResults.length} results with text search`,
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
        isError: false,
      };
    } catch (error) {
      console.error('TextSearchTabsContentTool: Search failed:', error);
      return createErrorResponse(
        `Text search failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }
}

// Export tool instance
export const textSearchTabsContentTool = new TextSearchTabsContentTool();
