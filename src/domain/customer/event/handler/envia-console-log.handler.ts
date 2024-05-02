import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface";
import CustomerChangedAddressEvent from "../customer-changed-address.event";

export default class EnviaConsoleLogHandler 
    implements EventHandlerInterface<CustomerChangedAddressEvent> {

    handle(event: CustomerChangedAddressEvent): void {
        console.log(
            `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${JSON.stringify(event.eventData.Address)}`
        )
    }
}