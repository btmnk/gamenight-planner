export interface User {
  id: string;
  username: string;
  global_name: string;
  avatar: string | null;
  /**
   * @deprecated
   */
  discriminator: string;
  public_flags: number;
  flags: number;
  banner: string;
  banner_color: null;
  accent_color: null;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
  avatar_decoration: null;
}
