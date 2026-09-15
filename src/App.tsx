/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Copy,
  Check,
  Code,
  Eye,
  Search,
  ExternalLink,
  BookOpen,
  Sparkles,
  Layers,
} from 'lucide-react';
import { NOTEPAD_CONTENT, MARKDOWN_CONTENT, HTML_CONTENT } from './contentData';

type TabType = 'notepad' | 'markdown' | 'html' | 'preview';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('notepad');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Helper to trigger direct file download in browser
  const handleDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper to copy content to clipboard
  const handleCopy = async (content: string, label: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedType(label);
      setTimeout(() => setCopiedType(null), 2200);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = content;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedType(label);
      setTimeout(() => setCopiedType(null), 2200);
    }
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'notepad':
        return NOTEPAD_CONTENT;
      case 'markdown':
        return MARKDOWN_CONTENT;
      case 'html':
        return HTML_CONTENT;
      default:
        return '';
    }
  };

  const filterContent = (text: string) => {
    if (!searchQuery.trim()) return text;
    const lines = text.split('\n');
    const filtered = lines.filter((line) =>
      line.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filtered.length > 0
      ? filtered.join('\n')
      : `// No lines matching "${searchQuery}"`;
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-pink-600 flex items-center justify-center text-white shadow-sm font-bold text-lg">
              IG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-slate-900 leading-tight">
                  IGDTUW FresherConnect
                </h1>
                <span className="text-[11px] px-2 py-0.5 font-semibold bg-pink-50 text-pink-700 border border-pink-200 rounded-full">
                  Batch 2026
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Notepad (.txt), Markdown (.md), and HTML Source Code Exporter
              </p>
            </div>
          </div>

          {/* Quick Action Download Buttons */}
          <div className="flex items-center flex-wrap gap-2">
            <button
              id="btn-download-txt"
              onClick={() =>
                handleDownload(
                  NOTEPAD_CONTENT,
                  'igdtuw_fresherconnect.txt',
                  'text/plain;charset=utf-8'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              Notepad (.txt)
            </button>

            <button
              id="btn-download-md"
              onClick={() =>
                handleDownload(
                  MARKDOWN_CONTENT,
                  'igdtuw_fresherconnect.md',
                  'text/markdown;charset=utf-8'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-200" />
              Markdown (.md)
            </button>

            <button
              id="btn-download-html"
              onClick={() =>
                handleDownload(
                  HTML_CONTENT,
                  'igdtuw_fresherconnect.html',
                  'text/html;charset=utf-8'
                )
              }
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-pink-600 text-white hover:bg-pink-700 transition shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-pink-200" />
              HTML (.html)
            </button>
          </div>
        </div>
      </header>

      {/* Control Navigation & Search Toolbar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Format Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 gap-1 overflow-x-auto">
            <button
              id="tab-notepad"
              onClick={() => setActiveTab('notepad')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'notepad'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              Notepad File (.txt)
            </button>

            <button
              id="tab-markdown"
              onClick={() => setActiveTab('markdown')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'markdown'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              Markdown (.md)
            </button>

            <button
              id="tab-html"
              onClick={() => setActiveTab('html')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'html'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Code className="w-3.5 h-3.5 text-pink-600" />
              HTML Source (.html)
            </button>

            <button
              id="tab-preview"
              onClick={() => setActiveTab('preview')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap ${
                activeTab === 'preview'
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-600" />
              Live Interactive Preview
            </button>
          </div>

          {/* Search and Copy Toolbar */}
          <div className="flex items-center gap-2">
            {activeTab !== 'preview' && (
              <div className="relative flex-1 md:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  id="input-search"
                  type="text"
                  placeholder="Filter lines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-pink-500 focus:bg-white"
                />
              </div>
            )}

            {activeTab !== 'preview' && (
              <button
                id="btn-copy-active"
                onClick={() => handleCopy(getActiveContent(), activeTab)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition shadow-2xs cursor-pointer whitespace-nowrap"
              >
                {copiedType === activeTab ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    Copy Code
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'notepad' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Notepad Window Titlebar Header */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block"></span>
                </div>
                <span className="text-xs font-medium text-slate-600 font-mono ml-2">
                  igdtuw_fresherconnect.txt — Windows Notepad Compatible
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  UTF-8 • Plain Text
                </span>
                <a
                  href="/igdtuw_fresherconnect.txt"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-pink-600 hover:underline inline-flex items-center gap-1"
                >
                  Raw File <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-900 text-slate-100 overflow-x-auto max-h-[70vh]">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre font-normal text-emerald-300">
                {filterContent(NOTEPAD_CONTENT)}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'markdown' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* Markdown Window Titlebar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-medium text-slate-700 font-mono">
                  igdtuw_fresherconnect.md — GitHub Flavored Markdown
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  CommonMark / GFM
                </span>
                <a
                  href="/igdtuw_fresherconnect.md"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-indigo-600 hover:underline inline-flex items-center gap-1"
                >
                  Raw File <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto max-h-[70vh]">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre font-normal text-indigo-200">
                {filterContent(MARKDOWN_CONTENT)}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'html' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            {/* HTML Window Titlebar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-pink-600" />
                <span className="text-xs font-medium text-slate-700 font-mono">
                  igdtuw_fresherconnect.html — Standalone Single Page Application
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 font-mono">
                  HTML5 + Tailwind CDN
                </span>
                <a
                  href="/igdtuw_fresherconnect.html"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-pink-600 hover:underline inline-flex items-center gap-1"
                >
                  Open in New Tab <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-4 bg-slate-950 text-slate-100 overflow-x-auto max-h-[70vh]">
              <pre className="font-mono text-xs leading-relaxed whitespace-pre font-normal text-pink-200">
                {filterContent(HTML_CONTENT)}
              </pre>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-xs text-emerald-800">
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Interactive Live Preview of the rendered IGDTUW FresherConnect Portal
              </div>
              <a
                href="/igdtuw_fresherconnect.html"
                target="_blank"
                rel="noreferrer"
                className="font-bold underline flex items-center gap-1 text-emerald-700 hover:text-emerald-900"
              >
                Launch in Fullscreen <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="border border-slate-300 rounded-2xl overflow-hidden shadow-sm bg-white h-[75vh]">
              <iframe
                title="IGDTUW FresherConnect Live Preview"
                src="/igdtuw_fresherconnect.html"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        )}

        {/* Feature Summary Grid below code view */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Notepad Ready (.txt)</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Cleanly formatted plain text with ASCII section headers, compatible with Windows Notepad, TextEdit, and command-line pagers.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>GitHub Markdown (.md)</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Formatted tables, headers, blockquotes, and lists for GitHub repositories, Notion, Obsidian, or documentation wikis.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-xs">
              <Layers className="w-4 h-4 text-pink-600" />
              <span>Standalone HTML (.html)</span>
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Self-contained responsive web page with Tailwind CSS CDN, interactive notices, hackathon cards, and emergency directory.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
