import { UserRole } from '../types';

export interface QuotaCheckResult {
  allowed: boolean;
  requiresPayment?: boolean;
  amount?: number;
  reason?: string;
  currentCount: number;
  maxAllowed?: number;
  role: UserRole;
  clientName?: string;
}

const STORAGE_KEYS = {
  CLIENT_CHECK_COUNT: 'dk_client_check_count',
  CLIENT_PAID_CREDITS: 'dk_client_paid_credits',
  CONSULTANT_CLIENT_REPORTS: 'dk_consultant_client_reports',
};

export class ReportQuotaService {
  /**
   * Get the number of score checks or report generations performed by the Client
   */
  static getClientCheckCount(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CLIENT_CHECK_COUNT);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Get how many extra paid checks the client has purchased
   */
  static getClientPaidCredits(): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CLIENT_PAID_CREDITS);
      return stored ? parseInt(stored, 10) : 0;
    } catch {
      return 0;
    }
  }

  /**
   * Get report count generated for a specific client under consultant mode
   */
  static getConsultantReportCountForClient(clientId: string): number {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONSULTANT_CLIENT_REPORTS);
      const map: Record<string, number> = stored ? JSON.parse(stored) : {};
      // default seeded counts: cli-101 has 1 (so next is 2), cli-102 has 1, cli-103 has 2 (quota full)
      if (map[clientId] !== undefined) {
        return map[clientId];
      }
      if (clientId === 'cli-101') return 1; // 1 report used, 1 remaining
      if (clientId === 'cli-102') return 1; // 1 report used, 1 remaining
      if (clientId === 'cli-103') return 2; // 2 reports used, quota reached
      return 1;
    } catch {
      return 1;
    }
  }

  /**
   * Check if score generation or check is allowed based on role and rules:
   * Rule 1: Client login limit score generation/check to only 1 time. Second time requires ₹800 payment.
   * Rule 2: Consultant login allows max 2 reports for one client.
   * Rule 3: Admin access has unlimited report generations and score checks.
   */
  static verifyQuota(role: UserRole | string, clientId: string = 'cli-101', clientName: string = 'Client'): QuotaCheckResult {
    const activeRole = (role as UserRole) || 'client';

    // RULE 3: ADMIN ACCESS - UNLIMITED
    if (activeRole === 'admin') {
      return {
        allowed: true,
        currentCount: 0,
        role: 'admin',
        reason: 'Admin Master Privilege: Unlimited reports generation and score checks permitted.'
      };
    }

    // RULE 1: CLIENT LOGIN - 1 FREE TIME, 2ND TIME ASKS FOR ₹800 PAYMENT
    if (activeRole === 'client') {
      const count = this.getClientCheckCount();
      const paidCredits = this.getClientPaidCredits();

      // If count is 0, they can do their 1 free score check / generation
      if (count < 1) {
        return {
          allowed: true,
          currentCount: count,
          maxAllowed: 1,
          role: 'client',
          clientName,
          reason: '1st Complimentary Bureau Check (Included Free)'
        };
      }

      // If they already used their 1 free check, check if they have paid credits
      if (paidCredits > 0) {
        return {
          allowed: true,
          currentCount: count,
          role: 'client',
          clientName,
          reason: `Unlocked via Paid Credit (₹800 Fee Settled)`
        };
      }

      // Second attempt onwards without payment -> BLOCK & ASK FOR PAYMENT (₹800)
      return {
        allowed: false,
        requiresPayment: true,
        amount: 800,
        currentCount: count,
        maxAllowed: 1,
        role: 'client',
        clientName,
        reason: 'Client score generation/check limit reached (1/1 free check used). Under Rule 1, a payment of ₹800 is required to generate or check an additional report.'
      };
    }

    // RULE 2: CONSULTANT LOGIN - 2 REPORTS ALLOWED FOR ONE CLIENT
    if (activeRole === 'consultant') {
      const clientReports = this.getConsultantReportCountForClient(clientId);
      const maxAllowed = 2;

      if (clientReports < maxAllowed) {
        return {
          allowed: true,
          currentCount: clientReports,
          maxAllowed,
          role: 'consultant',
          clientName,
          reason: `Consultant Tier: Report ${clientReports + 1} of ${maxAllowed} allowed for ${clientName}`
        };
      }

      // 2 reports already reached for this client -> BLOCK
      return {
        allowed: false,
        requiresPayment: false,
        currentCount: clientReports,
        maxAllowed,
        role: 'consultant',
        clientName,
        reason: `Consultant Quota Reached: Exactly 2 reports are allowed for one client (${clientName} has ${clientReports}/${maxAllowed} reports). Upgrade to Admin for unlimited reports or contact franchise coordinator.`
      };
    }

    return {
      allowed: true,
      currentCount: 0,
      role: 'client'
    };
  }

  /**
   * Record that a score check or report generation has occurred
   */
  static recordScoreCheck(role: UserRole | string, clientId: string = 'cli-101'): void {
    const activeRole = (role as UserRole) || 'client';
    if (activeRole === 'admin') {
      // No counters needed for admin
      return;
    }

    if (activeRole === 'client') {
      const currentCount = this.getClientCheckCount();
      const paidCredits = this.getClientPaidCredits();

      if (currentCount >= 1 && paidCredits > 0) {
        // consume 1 paid credit
        localStorage.setItem(STORAGE_KEYS.CLIENT_PAID_CREDITS, String(paidCredits - 1));
      }
      localStorage.setItem(STORAGE_KEYS.CLIENT_CHECK_COUNT, String(currentCount + 1));
    }

    if (activeRole === 'consultant') {
      const current = this.getConsultantReportCountForClient(clientId);
      const map = this.getConsultantMap();
      map[clientId] = current + 1;
      localStorage.setItem(STORAGE_KEYS.CONSULTANT_CLIENT_REPORTS, JSON.stringify(map));
    }
  }

  /**
   * Record successful payment of ₹800 for Client second check
   */
  static recordPayment(amount: number = 800): void {
    const credits = this.getClientPaidCredits();
    localStorage.setItem(STORAGE_KEYS.CLIENT_PAID_CREDITS, String(credits + 1));
  }

  private static getConsultantMap(): Record<string, number> {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONSULTANT_CLIENT_REPORTS);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  }

  /**
   * Reset all quotas (convenience helper for demo / testing)
   */
  static resetQuotas(): void {
    localStorage.removeItem(STORAGE_KEYS.CLIENT_CHECK_COUNT);
    localStorage.removeItem(STORAGE_KEYS.CLIENT_PAID_CREDITS);
    localStorage.removeItem(STORAGE_KEYS.CONSULTANT_CLIENT_REPORTS);
  }

  static resetDemo(): void {
    this.resetQuotas();
  }
}
