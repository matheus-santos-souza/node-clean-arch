import { EventDispatcherInterface } from "./event-dispatcher.interface";
import { EventHandlerInterface } from "./event-handler.interface";
import { EventInterface } from "./event.interface";

type typeGetEventHandlers = {
    [eventName: string]: EventHandlerInterface[]
}

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: typeGetEventHandlers = {}

    get getEventHandlers(): typeGetEventHandlers {
        return this.eventHandlers
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name
        if (this.eventHandlers[eventName]) {
            this.eventHandlers[eventName].forEach(eventHandler => {
                eventHandler.handle(event)
            })
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = []
        }
        this.eventHandlers[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface<EventInterface>): void {
        if (this.eventHandlers[eventName]) {
            const index = this.eventHandlers[eventName].indexOf(eventHandler)
            if (index !== -1) {
                this.eventHandlers[eventName].splice(index, 1)
            }
        }
    }
    
    unregisterAll(): void {
        this.eventHandlers = {}
    }

}