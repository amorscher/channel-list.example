/**
 * Code taken from https://github.com/angular/components/blob/main/src/cdk/testing/testbed/fake-events/event-objects.ts
 * Many THX!!!!
 */
/**
 * Creates a fake event object with any desired event type.
 * @docs-private
 */
export function createFakeEvent(
    type: string,
    bubbles = false,
    cancelable = true,
    composed = true
) {
    return new Event(type, { bubbles, cancelable, composed });
}

/**
 * Utility to dispatch any event on a Node.
 * @docs-private
 */
export function dispatchEvent<T extends Event>(
    node: Node | Window,
    event: T
): T {
    node.dispatchEvent(event);
    return event;
}

/**
 * Shorthand to dispatch a fake event on a specified node.
 * @docs-private
 */
export function dispatchFakeEvent(
    node: Node | Window,
    type: string,
    bubbles?: boolean
): Event {
    return dispatchEvent(node, createFakeEvent(type, bubbles));
}
