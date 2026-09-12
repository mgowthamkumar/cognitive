import { api } from './api';

export class TelemetryCollector {
  private topicId: string | null = null;
  private sessionStartTime: number = Date.now();
  private lastScrollTime: number = Date.now();
  private totalScrollDuration: number = 0;
  private scrollTimer: any = null;
  private isScrolling: boolean = false;
  private keystrokeCount: number = 0;
  private pasteCount: number = 0;

  public initTopicSession(topicId: string) {
    if (this.topicId === topicId) return;

    // Send page view event for previous topic if switching
    if (this.topicId) {
      this.flushSession();
    }

    this.topicId = topicId;
    this.sessionStartTime = Date.now();
    this.totalScrollDuration = 0;
    this.keystrokeCount = 0;
    this.pasteCount = 0;

    // Check if this is a revisit
    const visitKey = `visited_topic_${topicId}`;
    const previousVisits = parseInt(sessionStorage.getItem(visitKey) || '0', 10);
    sessionStorage.setItem(visitKey, (previousVisits + 1).toString());

    if (previousVisits > 0) {
      api.sendTelemetryEvent({
        topic_id: topicId,
        event_type: 'PAGE_REVISIT',
        duration: 0,
        metadata: { visit_count: previousVisits + 1 }
      });
    } else {
      api.sendTelemetryEvent({
        topic_id: topicId,
        event_type: 'PAGE_VIEW',
        duration: 0,
        metadata: { first_visit: true }
      });
    }
  }

  public recordScroll() {
    if (!this.topicId) return;

    const now = Date.now();
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.lastScrollTime = now;
    }

    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.isScrolling = false;
      const scrollChunk = (Date.now() - this.lastScrollTime) / 1000;
      this.totalScrollDuration += scrollChunk;

      api.sendTelemetryEvent({
        topic_id: this.topicId!,
        event_type: 'SCROLL',
        duration: Math.round(scrollChunk),
        metadata: { total_scroll_seconds: Math.round(this.totalScrollDuration) }
      });
    }, 800);
  }

  public recordKeystroke() {
    this.keystrokeCount += 1;
  }

  public recordPaste() {
    this.pasteCount += 1;
  }

  public getCodeTelemetry() {
    return {
      keystrokes: this.keystrokeCount,
      paste_events: this.pasteCount
    };
  }

  public flushSession() {
    if (!this.topicId) return;
    const duration = Math.round((Date.now() - this.sessionStartTime) / 1000);
    if (duration > 2) {
      api.sendTelemetryEvent({
        topic_id: this.topicId,
        event_type: 'TOPIC_COMPLETE',
        duration,
        metadata: {
          total_scroll_seconds: Math.round(this.totalScrollDuration),
          keystrokes: this.keystrokeCount,
          paste_events: this.pasteCount
        }
      });
    }
  }
}

export const telemetry = new TelemetryCollector();
