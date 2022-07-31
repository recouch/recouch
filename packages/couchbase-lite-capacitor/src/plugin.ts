import { registerPlugin } from '@capacitor/core';

import type { CouchbaseLitePlugin } from './definitions';

export const CouchbaseLite = registerPlugin<CouchbaseLitePlugin>('CouchbaseLite');
