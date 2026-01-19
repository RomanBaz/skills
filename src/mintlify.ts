import matter from 'gray-matter';
import type { MintlifySkill } from './types.js';

/**
 * Fetch a skill.md file from a direct URL and parse its contents
 * Looks for `mintlify-site` in metadata.mintlify-site to identify Mintlify-hosted skills
 * 
 * Expected frontmatter format:
 * ---
 * name: Bun Development
 * description: Build applications with Bun runtime
 * metadata:
 *   mintlify-site: bun.com
 * ---
 */
export async function fetchMintlifySkill(url: string): Promise<MintlifySkill | null> {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return null;
        }
        
        const content = await response.text();
        const { data } = matter(content);
        
        // Must have mintlify-site in metadata
        const mintlifySite = data.metadata?.['mintlify-site'];
        if (!mintlifySite) {
            return null;
        }
        
        // Must have name and description
        if (!data.name || !data.description) {
            return null;
        }
        
        return {
            name: data.name,
            description: data.description,
            content: content, // Full content including frontmatter
            mintlifySite: mintlifySite,
            sourceUrl: url,
        };
    } catch {
        return null;
    }
}

/**
 * Check if a direct URL skill.md is a Mintlify-hosted skill
 * by fetching and checking for mintlify-site frontmatter
 */
export async function isMintlifySkill(url: string): Promise<boolean> {
    const skill = await fetchMintlifySkill(url);
    return skill !== null;
}
