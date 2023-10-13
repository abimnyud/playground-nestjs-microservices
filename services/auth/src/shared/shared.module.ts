import { Global, Module } from '@nestjs/common';
import { CloudPubSubClientService } from './pub-sub.service';

@Global()
@Module({
  imports: [],
  providers: [CloudPubSubClientService],
  exports: [CloudPubSubClientService],
})
export class SharedModule {}
