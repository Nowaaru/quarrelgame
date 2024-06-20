import { Motion, EntityState, Input, Hitbox, Skill, Animation, Character } from "@rbxts/quarrelgame-framework";
import { CloseSlash, ForwardKick, LowHeavy } from "./normals";

const JOEBAIKEN = new Character.CharacterBuilder2D()
    .SetName("JOE BAIKEN")
    .SetSubheader("OH GOD SHE'S GETTING CLOSER")
    .SetHeader("YOU CAN'T RUN")
    .SetDescription("Test character 4")
    .SetModel(Character.GetCharacterModel<CharacterModels>().brighteyes as never)
    .SetEasiness(3)
    .SetAttack([Motion.Neutral, Input.Slash], CloseSlash)
    .SetAttack([Motion.Neutral, Input.Kick], ForwardKick)
    .SetAttack([Motion.Down, Input.Heavy], LowHeavy)
    .SetAnimation(
        EntityState.Idle,
        new Animation.AnimationBuilder()
            .SetName("Idle")
            .SetAnimationId("rbxassetid://14280621593")
            .SetPriority(Enum.AnimationPriority.Idle)
            .SetLooped(true)
            .Construct(),
    )
    .SetAnimation(
        EntityState.Crouch,
        new Animation.AnimationBuilder()
            .SetName("Crouch")
            .SetAnimationId("rbxassetid://14288051389")
            .SetPriority(Enum.AnimationPriority.Movement)
            .SetLooped(true)
            .Construct(),
    )
    .AddSkill(
        new Skill.SkillBuilder()
            .SetName("Test Skill")
            .SetDescription("A test skill.")
            .SetFrameData(
                new Skill.FrameDataBuilder()
                    .SetAnimation(
                        new Animation.AnimationBuilder()
                            .SetName("Test Skill")
                            .SetAnimationId("rbxassetid://14280676559")
                            .SetPriority(Enum.AnimationPriority.Action)
                            .Construct(),
                    )
                    .SetStartup(4)
                    .SetActive(6)
                    .SetRecovery(-4)
                    .SetHitbox(
                        new Hitbox.HitboxBuilder()
                            .SetOffset()
                            .SetSize(new Vector3(7, 7, 7))
                            .Construct(),
                    ),
            )
            .SetGaugeRequired(25)
            .SetGroundedType(Skill.SkillGroundedType.Ground)
            .SetReversal(false)
            .Construct(),
    )
    .Construct();

export = JOEBAIKEN;
