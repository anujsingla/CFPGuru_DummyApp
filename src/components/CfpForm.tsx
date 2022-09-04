import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Radio,
  TextArea,
  TextInput,
} from "@patternfly/react-core";
import { keys, map } from "lodash";
import { useEffect, useState } from "react";
import { ConferenceAttendeeMembers } from "../enum/conferenceAttendeeMembers";
import { ConferenceCommitteeMembers } from "../enum/conferenceCommitteeMembers";
import { ConferenceTypes } from "../enum/conferenceTypes";
import {
  getCfpFormCache,
  ICFPFormState,
  initialCfpFormState,
  setCfpFormCache,
} from "./CfpFormHelper";

export function CfpForm() {
  const [cfpFormState, setCfpFormState] =
    useState<ICFPFormState>(initialCfpFormState);
  const onUpdateValue = (key: string, value: any) => {
    const updatedValue = {
      ...cfpFormState,
      [key]: value,
    };
    setCfpFormState(updatedValue);
    setCfpFormCache(updatedValue);
  };
  const isFreeCfpType = ConferenceTypes.Free === cfpFormState.conferenceType;
  const onProbleChange = (text: string) => {
    onUpdateValue("problem", text);
  };

  const onProbleReasonChange = (text: string) => {
    onUpdateValue("problemReason", text);
  };

  const onProbleTitleChange = (text: string) => {
    onUpdateValue("title", text);
  };

  const onProbleTitleProblemSolutionChange = (text: string) => {
    onUpdateValue("titleProblemSolution", text);
  };

  const onProbleTakewaysChange = (text: string) => {
    onUpdateValue("takeways", text);
  };

  const onConferenceTypeChange = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceType", value);
  };

  const onConferenceCommiteeMemberChange = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceCommitteeMembers", value);
  };

  const onConferenceAttendeeMemberChange = (_, event) => {
    const { value } = event?.currentTarget;
    onUpdateValue("conferenceAttendeeMembers", value);
  };

  const onSubmitForm = () => {
    console.log("cfpFormState", cfpFormState);
  };

  const getCacheValue = async () => {
    const cache = await getCfpFormCache();
    setCfpFormState({
      ...cfpFormState,
      ...cache,
    });
  };

  useEffect(() => {
    getCacheValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConferenceTypeRadio = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="conferenceType-group"
        label="What kind of conference is this?"
        isRequired
      >
        {map(keys(ConferenceTypes), (key: string) => {
          const value = ConferenceTypes[key];
          return (
            <Radio
              value={value}
              key={key}
              name="conferenceType-radio"
              label={value}
              id={`conferenceType-radio-01-${key}`}
              onChange={onConferenceTypeChange}
              isChecked={cfpFormState.conferenceType === value}
            />
          );
        })}
      </FormGroup>
    );
  };

  const getConferenceFreeRadio = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="communitemember-group"
        label="Describe the average organizer/jury committee member for this conf?"
        isRequired
      >
        {map(keys(ConferenceCommitteeMembers), (key: string) => {
          const value = ConferenceCommitteeMembers[key];
          return (
            <Radio
              name="communitemember-radio"
              label={value}
              id={`communitemember-radio-${key}`}
              value={value}
              key={key}
              onChange={onConferenceCommiteeMemberChange}
              isChecked={cfpFormState.conferenceCommitteeMembers === value}
            />
          );
        })}
      </FormGroup>
    );
  };

  const getConferencePaidRadio = () => {
    return (
      <FormGroup
        role="radiogroup"
        isInline
        fieldId="communitememberpaid-group"
        label="Point out the value that this conference generates for the average attendee?"
        isRequired
      >
        {map(keys(ConferenceAttendeeMembers), (key: string) => {
          const value = ConferenceAttendeeMembers[key];
          return (
            <Radio
              name="communitememberpaid-radio"
              key={key}
              label={value}
              id={`communitememberpaid-radio-${key}`}
              onChange={onConferenceAttendeeMemberChange}
              isChecked={cfpFormState.conferenceAttendeeMembers === value}
              value={value}
            />
          );
        })}
      </FormGroup>
    );
  };

  return (
    <Card isPlain>
      <CardTitle>Abstract generator</CardTitle>
      <CardBody>
        <Form isWidthLimited>
          {getConferenceTypeRadio()}
          {isFreeCfpType ? getConferenceFreeRadio() : getConferencePaidRadio()}
          <FormGroup
            isRequired
            label="Describe the problem that your submission tries to address"
            fieldId="cfpProblem"
            helperText={`"Just the problem" and why is it a problem for the average Organizer/Jury member <use selected radio from previous question>`}
          >
            <TextArea
              value={cfpFormState.problem}
              onChange={onProbleChange}
              id="cfpProblem"
              name="cfpProblem"
            />
          </FormGroup>
          <FormGroup
            isRequired
            label="Reasons for the problem"
            fieldId="cfpProblemreason"
            helperText={`Describe the reasons (preferably in a list) that cause the problem that your paper tries to address`}
          >
            <TextArea
              value={cfpFormState.problemReason}
              onChange={onProbleReasonChange}
              id="cfpProblemreason"
              name="cfpProblemreason"
            />
          </FormGroup>
          <FormGroup
            helperText="Name your paper in a way that addresses all the reasons that you listed in last question"
            isRequired
            label="Title of the paper"
            fieldId="cfpTitle"
          >
            <TextInput
              value={cfpFormState.title}
              onChange={onProbleTitleChange}
              id="cfpTitle"
              name="cfpTitle"
              type="text"
              aria-describedby="Title for cfp"
            />
          </FormGroup>
          <FormGroup
            isRequired
            label="Describe how your title is actually solving the problems you listed in question 3."
            fieldId="cfpReasonForTitle"
            helperText={`You can use - real world experience reports, case studies, research papers or your analysis as arguements.`}
          >
            <TextArea
              value={cfpFormState.titleProblemSolution}
              onChange={onProbleTitleProblemSolutionChange}
              id="cfpReasonForTitle"
              name="cfpReasonForTitle"
            />
          </FormGroup>
          <FormGroup
            isRequired
            label="Takeways"
            fieldId="cfpTakeaway"
            helperText={`Repeat the top 3 key lessons from your paper.`}
          >
            <TextArea
              value={cfpFormState.takeways}
              onChange={onProbleTakewaysChange}
              id="cfpTakeaway"
              name="cfpTakeaway"
            />
          </FormGroup>
          <ActionGroup>
            <Button onClick={onSubmitForm} variant="primary">
              Submit
            </Button>
            <Button variant="link">Cancel</Button>
          </ActionGroup>
        </Form>
      </CardBody>
    </Card>
  );
}
