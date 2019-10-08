import React from 'react';
import View from '@vkontakte/vkui/dist/components/View/View';
import {
	ModalRoot,
	ModalPage,
	ModalPageHeader,
	HeaderButton,
	FormLayout,
	Radio,
	List,
	InfoRow,
	platform,
	Panel, PanelHeader, Group
} from '@vkontakte/vkui'
import {OS} from '@vkontakte/vkui/dist/lib/platform'
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup"
import Button from "@vkontakte/vkui/dist/components/Button/Button"
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry"
import Checkbox from "@vkontakte/vkui/dist/components/Checkbox/Checkbox"
import Input from "@vkontakte/vkui/dist/components/Input/Input"
import Cell from "@vkontakte/vkui/dist/components/Cell/Cell"
import ModalCard from "@vkontakte/vkui/dist/components/ModalCard/ModalCard"
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar"
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea"
import UsersStack from "@vkontakte/vkui/dist/components/UsersStack/UsersStack"
import {getRandomUser,importantCountries} from "./utils"
import '@vkontakte/vkui/dist/vkui.css'

import Icon24Cancel from "@vkontakte/icons/dist/24/cancel"
import Icon24Done from "@vkontakte/icons/dist/24/done"
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss"
import Icon56MoneyTransferOutline from "@vkontakte/icons/dist/56/money_transfer_outline"
import Icon56NotificationOutline from "@vkontakte/icons/dist/56/notification_outline"

const IS_PLATFORM_ANDROID = platform() === OS.ANDROID
const IS_PLATFORM_IOS = platform() === OS.IOS

const MODAL_PAGE_FILTERS = 'filters';
const MODAL_PAGE_COUNTRIES = 'countries';
const MODAL_PAGE_STORY_FEEDBACK = 'story-feedback';
const MODAL_PAGE_USER_INFO = 'user-info';

const MODAL_CARD_MONEY_SEND = 'money-send';
const MODAL_CARD_APP_TO_MENU = 'app-to-menu';
const MODAL_CARD_ABOUT = 'say-about';
const MODAL_CARD_NOTIFICATIONS = 'notifications';
const MODAL_CARD_CHAT_INVITE = 'chat-invite';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activeModal: null,
			modalHistory: []
		};

		this.users = 'k'.repeat(25).split('').map(() => {
			return getRandomUser();
		});

		this.modalBack = () => {
			this.setActiveModal(this.state.modalHistory[this.state.modalHistory.length - 2]);
		};
	}

	setActiveModal(activeModal) {
		activeModal = activeModal || null;
		let modalHistory = this.state.modalHistory ? [...this.state.modalHistory] : [];

		if (activeModal === null) {
			modalHistory = [];
		} else if (modalHistory.indexOf(activeModal) !== -1) {
			modalHistory = modalHistory.splice(0, modalHistory.indexOf(activeModal) + 1);
		} else {
			modalHistory.push(activeModal);
		}

		this.setState({
			activeModal,
			modalHistory
		});
	};

	render() {
		const modal = (
			<ModalRoot activeModal={this.state.activeModal}>
				<ModalPage
					id={MODAL_PAGE_FILTERS}
					onClose={this.modalBack}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={<HeaderButton onClick={this.modalBack}>{IS_PLATFORM_IOS ? 'Готово' : <Icon24Done />}</HeaderButton>}
						>
							Фильтры
						</ModalPageHeader>
					}
				>
					<FormLayout>
						<FormLayoutGroup>
							<Button level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} size="xl">Выбор страны</Button>
							<Button level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_STORY_FEEDBACK)} size="xl">Просмотры истории</Button>
							<Button level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>
						</FormLayoutGroup>

						<SelectMimicry top="Страна" placeholder="Выбрать страну" onClick={() => this.setActiveModal(MODAL_PAGE_COUNTRIES)} />
						<SelectMimicry top="Город" placeholder="Выбрать город" disabled />

						<FormLayoutGroup top="Работа">
							<Input placeholder="Место работы" />
							<Input placeholder="Должность" />
						</FormLayoutGroup>

						<FormLayoutGroup top="Пол">
							<Radio name="sex" value={0} defaultChecked>Любой</Radio>
							<Radio name="sex" value={1}>Мужской</Radio>
							<Radio name="sex" value={2}>Женский</Radio>
						</FormLayoutGroup>

						<SelectMimicry top="Школа" placeholder="Выбрать школу" disabled />
						<SelectMimicry top="Университет" placeholder="Выбрать университет" disabled />

						<FormLayoutGroup top="Дополнительно">
							<Checkbox>С фотографией</Checkbox>
							<Checkbox>Сейчас на сайте</Checkbox>
						</FormLayoutGroup>

						<FormLayoutGroup top="Работа">
							<Input placeholder="Место работы" />
							<Input placeholder="Должность" />
						</FormLayoutGroup>

						<FormLayoutGroup top="Дата рождения">
							<SelectMimicry placeholder="День рождения" disabled />
							<SelectMimicry placeholder="Месяц рождения" disabled />
							<SelectMimicry placeholder="Год рождения" disabled />
						</FormLayoutGroup>
					</FormLayout>
				</ModalPage>

				<ModalPage
					id={MODAL_PAGE_COUNTRIES}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={IS_PLATFORM_IOS && <HeaderButton onClick={this.modalBack}><Icon24Dismiss /></HeaderButton>}
						>
							Выберите страну
						</ModalPageHeader>
					}
					onClose={this.modalBack}
					settlingHeight={80}
				>
					<FormLayoutGroup top="Работа">
						<Input placeholder="Место работы" />
					</FormLayoutGroup>
					<FormLayout>
						<Button level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_USER_INFO)} size="xl">Информация о пользователе</Button>

						<FormLayoutGroup>
							{importantCountries.map(({ id, title }) => {
								return (
									<Radio key={id} name="country" value={id}>{title}</Radio>
								);
							})}
						</FormLayoutGroup>

					</FormLayout>
				</ModalPage>

				<ModalPage
					id={MODAL_PAGE_STORY_FEEDBACK}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={IS_PLATFORM_IOS && <HeaderButton onClick={this.modalBack}><Icon24Dismiss /></HeaderButton>}
						>
							Просмотры истории
						</ModalPageHeader>
					}
					onClose={this.modalBack}
					settlingHeight={80}
				>
					<List>
						{this.users.map((user) => {
							return (
								<Cell
									before={<Avatar src={user.photo} />}
									key={user.id}
								>{user.name}</Cell>
							);
						})}
					</List>
				</ModalPage>

				<ModalPage
					id={MODAL_PAGE_USER_INFO}
					header={
						<ModalPageHeader
							left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.modalBack}><Icon24Cancel /></HeaderButton>}
							right={IS_PLATFORM_IOS && <HeaderButton onClick={this.modalBack}><Icon24Dismiss /></HeaderButton>}
						>
							Информация о пользователе
						</ModalPageHeader>
					}
					onClose={this.modalBack}
				>
					<FormLayout>
					<FormLayoutGroup top="Работа">
						<Input placeholder="Место работы" />
					</FormLayoutGroup>
					</FormLayout>
					<List>
						<Cell>
							<InfoRow title="Дата рождения">
								30 января 1993
							</InfoRow>
						</Cell>
						<Cell>
							<InfoRow title="Родной город">
								Ереван
							</InfoRow>
						</Cell>
						<Cell>
							<InfoRow title="Место работы">
								Команда ВКонтакте
							</InfoRow>
						</Cell>
					</List>
					<FormLayout>
						<FormLayoutGroup top="Работа">
							<Input placeholder="Место работы" />
						</FormLayoutGroup>
					</FormLayout>
				</ModalPage>

				<ModalCard
					id={MODAL_CARD_MONEY_SEND}
					onClose={() => this.setActiveModal(null)}
					icon={<Icon56MoneyTransferOutline />}
					title="Отправляйте деньги друзьям, используя банковскую карту"
					caption="Номер карты получателя не нужен — он сам решит, куда зачислить средства."
					actions={[{
						title: 'Попробовать',
						type: 'primary',
						action: () => {
							this.setActiveModal(MODAL_CARD_APP_TO_MENU);
						}
					}]}
				>

				</ModalCard>

				<ModalCard
					id={MODAL_CARD_APP_TO_MENU}
					onClose={() => this.setActiveModal(null)}
					icon={<Avatar type="app" src="https://pp.userapi.com/c639222/v639222699/5e1d8/2wtUaVn4Pho.jpg" size={72} />}
					title="Добавить игру «Загадки детства» в меню?"
					caption="Игра появится под списком разделов на экране меню и будет всегда под рукой."
					actions={[{
						title: 'Добавить в меню',
						type: 'primary',
						action: () => {
							this.setActiveModal(MODAL_CARD_ABOUT);
						}
					}
					]}
				/>

				<ModalCard
					id={MODAL_CARD_ABOUT}
					onClose={() => this.setActiveModal(null)}
					title="Расскажите о себе"
					actions={[
						{
							title: 'Сохранить',
							type: 'primary',
							action: () => {
								this.setActiveModal(MODAL_CARD_NOTIFICATIONS);
							}
						}
					]}
				>
					<Textarea defaultValue={'В Грузии'} />
				</ModalCard>

				<ModalCard
					id={MODAL_CARD_NOTIFICATIONS}
					onClose={() => this.setActiveModal(null)}
					icon={<Icon56NotificationOutline />}
					title="Приложение запрашивает разрешение на отправку Вам уведомлений"
					actions={[{
						title: 'Запретить',
						type: 'secondary',
						action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
					}, {
						title: 'Разрешить',
						type: 'primary',
						action: () => this.setActiveModal(MODAL_CARD_CHAT_INVITE)
					}]}
				/>

				<ModalCard
					id={MODAL_CARD_CHAT_INVITE}
					onClose={() => this.setActiveModal(null)}
					icon={<Avatar src="https://pp.userapi.com/c849324/v849324409/1cacfa/MLy1Lzz_q6E.jpg" size={72} />}
					title="Баскетбол на выходных"
					caption="Приглашение в беседу"
					actions={[{
						title: 'Присоединиться',
						type: 'primary',
						action: () => this.setActiveModal(null)
					}, {
						title: 'Скопировать приглашение',
						type: 'secondary',
						action: () => this.setActiveModal(null)
					}]}
					actionsLayout="vertical"
				>
					<UsersStack
						photos={[
							'https://sun9-9.userapi.com/c847219/v847219582/1eac9d/jxtvce2MwZk.jpg?ava=1',
							'https://pp.userapi.com/c834200/v834200315/1039ea/iFd9WUOdmDo.jpg?ava=1',
							'https://sun9-20.userapi.com/c850332/v850332555/115030/JyNJrr4cytY.jpg?ava=1',
							'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1',
							'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1',
							'https://sun9-18.userapi.com/c850024/v850024671/16f784/jDmN7V0YVb4.jpg?ava=1'
						]}
						size="m"
						count={3}
						vertical
					>Алексей, Илья, Михаил<br />и ещё 3 человека</UsersStack>
				</ModalCard>
			</ModalRoot>
		);

		return (
			<View activePanel="modals" modal={modal}>
				<Panel id="modals">
					<PanelHeader>Модальные окна</PanelHeader>

					<Group>
						<FormLayout>
							<Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_PAGE_FILTERS)}>
								Открыть модальную страницу
							</Button>

							<Button size="xl" level="secondary" onClick={() => this.setActiveModal(MODAL_CARD_MONEY_SEND)}>
								Открыть модальные карточки
							</Button>
						</FormLayout>
					</Group>
				</Panel>
			</View>
		);
	}
}
export default App;

