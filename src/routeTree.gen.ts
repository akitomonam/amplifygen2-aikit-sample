/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as MemberImport } from './routes/member'
import { Route as GenerationImport } from './routes/generation'
import { Route as ConversationImport } from './routes/conversation'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const MemberRoute = MemberImport.update({
  id: '/member',
  path: '/member',
  getParentRoute: () => rootRoute,
} as any)

const GenerationRoute = GenerationImport.update({
  id: '/generation',
  path: '/generation',
  getParentRoute: () => rootRoute,
} as any)

const ConversationRoute = ConversationImport.update({
  id: '/conversation',
  path: '/conversation',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/conversation': {
      id: '/conversation'
      path: '/conversation'
      fullPath: '/conversation'
      preLoaderRoute: typeof ConversationImport
      parentRoute: typeof rootRoute
    }
    '/generation': {
      id: '/generation'
      path: '/generation'
      fullPath: '/generation'
      preLoaderRoute: typeof GenerationImport
      parentRoute: typeof rootRoute
    }
    '/member': {
      id: '/member'
      path: '/member'
      fullPath: '/member'
      preLoaderRoute: typeof MemberImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/conversation': typeof ConversationRoute
  '/generation': typeof GenerationRoute
  '/member': typeof MemberRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/conversation': typeof ConversationRoute
  '/generation': typeof GenerationRoute
  '/member': typeof MemberRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/conversation': typeof ConversationRoute
  '/generation': typeof GenerationRoute
  '/member': typeof MemberRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/conversation' | '/generation' | '/member'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/conversation' | '/generation' | '/member'
  id: '__root__' | '/' | '/conversation' | '/generation' | '/member'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ConversationRoute: typeof ConversationRoute
  GenerationRoute: typeof GenerationRoute
  MemberRoute: typeof MemberRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ConversationRoute: ConversationRoute,
  GenerationRoute: GenerationRoute,
  MemberRoute: MemberRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/conversation",
        "/generation",
        "/member"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/conversation": {
      "filePath": "conversation.tsx"
    },
    "/generation": {
      "filePath": "generation.tsx"
    },
    "/member": {
      "filePath": "member.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
