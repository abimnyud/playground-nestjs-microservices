import {
  HttpException,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { GCPubSubClient } from 'nestjs-google-pubsub-microservice';

@Injectable()
export class CloudPubSubClientService implements OnApplicationShutdown {
  public client: GCPubSubClient;

  constructor() {
    this.client = new GCPubSubClient({
      topic: `${process.env.NODE_ENV}_topic`,
      noAck: true,
      client: {
        projectId: 'abimanyu_development',
        // keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
    });

    this.client.connect().then(() => {
      Logger.log(
        'Google pub/sub successfully connected',
        'CloudPubSubClientService',
      );
    });
  }

  private async _publish(
    pattern: string,
    data: Record<any, any>,
  ): Promise<void> {
    try {
      await this.client.emit(pattern, data).toPromise();
    } catch (err) {
      throw new HttpException(err.message, Number(err.code ?? 400));
    }
  }

  async publish(eventName: string, data: any): Promise<void> {
    return await this._publish(eventName, data);
  }

  onApplicationShutdown() {
    return this.client.close();
  }
}
