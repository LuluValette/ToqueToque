import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartieBuilderService } from '../../../services/partie-builder.service';
import { CardWithButtonComponent } from '../../../components/card/card-with-button/card-with-button.component';
import { CardWithTinyIconComponent } from '../../../components/card/card-with-tiny-icon/card-with-tiny-icon.component';
import { ApiService } from '../../../services/api.service';
import {TextComponent} from '../../../components/text/text.component';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [
    CommonModule,
    CardWithButtonComponent,
    CardWithTinyIconComponent,
    TextComponent,
  ],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent implements OnInit {
  participants: any[] = [];
  userNames: { [userId: string]: string } = {}; // clé en string pour correspondre à userId

  constructor(
    private partieBuilder: PartieBuilderService,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.participants = this.partieBuilder.get('participants');

    this.participants.forEach(participant => {
      this.api.getUserById(participant.userId).subscribe(user => {
        this.userNames[participant.userId] = user.name;
      });
    });

    console.log(this.participants);
  }

  getUserName(userId: string): string {
    return this.userNames[userId] || 'Chargement...';
  }
}
