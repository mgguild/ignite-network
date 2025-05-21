import { NextRequest } from 'next/server';
import { PrismaClient } from '../../../../generated/prisma';

interface CacheEntry {
  data: unknown;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};
const CACHE_REFRESH = 60 * 60 * 1000 // 1 hour refresh threshold

const prisma = new PrismaClient();

async function fetchTokenData(cacheKey: string, filter?: Record<string, unknown>) {
  try {
    const cacheEntry = cache[cacheKey];
    const now = Date.now();
    
    if (cacheEntry && (now - cacheEntry.timestamp < CACHE_REFRESH)) {
      console.log('Returning cached token data (less than 1 hour old)');
      return { data: cacheEntry.data };
    }
    
    console.log('Cache missing or older than 15 minutes - fetching fresh token data');
    
    const tokens = filter
      ? await prisma.token.findMany({ where: filter })
      : await prisma.token.findMany();
    
    // Store in cache
    cache[cacheKey] = {
      data: tokens,
      timestamp: Date.now()
    };
    
    return { data: tokens };
  } catch (error) {
    console.error('Error fetching token data:', error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const asset = url.searchParams.get('asset');
    const product = url.searchParams.get('product');
    
    const filter: Record<string, unknown> = {};
    if (asset) filter.asset = asset;
    if (product) filter.product = product;
    
    const cacheKey = `tokens-${Object.entries(filter).map(([k, v]) => `${k}:${v}`).join('-') || 'all'}`;
    
    const { data } = await fetchTokenData(cacheKey, Object.keys(filter).length > 0 ? filter : undefined);
    
    if (data && Array.isArray(data) && data.length > 0) {
      return new Response(
        JSON.stringify({ tokens: data }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else if (data && Array.isArray(data) && data.length === 0) {
      return new Response(
        JSON.stringify({ tokens: [], message: 'No tokens found matching the criteria' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Unable to retrieve token data' }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in token data API route:', error);
    return new Response(
      JSON.stringify({ 
        error: `Server error: Unable to process the request. ${error instanceof Error ? error.message : 'Unknown error'}` 
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const { filter } = await req.json();
    
    const cacheKey = `tokens-${Object.entries(filter || {}).map(([k, v]) => `${k}:${v}`).join('-') || 'all'}`;
    
    const { data } = await fetchTokenData(cacheKey, filter);
    
    if (data && Array.isArray(data) && data.length > 0) {
      return new Response(
        JSON.stringify({ tokens: data }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else if (data && Array.isArray(data) && data.length === 0) {
      return new Response(
        JSON.stringify({ tokens: [], message: 'No tokens found matching the criteria' }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: 'Unable to retrieve token data' }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in token data API route:', error);
    return new Response(
      JSON.stringify({ 
        error: `Server error: Unable to process the request. ${error instanceof Error ? error.message : 'Unknown error'}` 
      }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}