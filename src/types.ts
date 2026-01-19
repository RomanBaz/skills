export type AgentType = 'amp' | 'antigravity' | 'claude-code' | 'clawdbot' | 'codex' | 'cursor' | 'droid' | 'gemini-cli' | 'github-copilot' | 'goose' | 'kilo' | 'kiro-cli' | 'opencode' | 'roo' | 'trae' | 'windsurf';

export interface Skill {
  name: string;
  description: string;
  path: string;
  metadata?: Record<string, string>;
}

export interface AgentConfig {
  name: string;
  displayName: string;
  skillsDir: string;
  globalSkillsDir: string;
  detectInstalled: () => Promise<boolean>;
}

export interface ParsedSource {
  type: 'github' | 'gitlab' | 'git' | 'local' | 'direct-url';
  url: string;
  subpath?: string;
  localPath?: string;
  ref?: string;
}

export interface MintlifySkill {
  name: string;
  description: string;
  content: string;
  mintlifySite: string;
  sourceUrl: string;
}
