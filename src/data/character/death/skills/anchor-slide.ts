
import { Skill, Hitbox, Animation } from "@quarrelgame-framework/common";
import { HideDolphin } from "../util/dolphin";
import FrameData from "shared/framedata.json";

export const AnchorSlide = new Skill.SkillBuilder()
    .SetName("Anchor Slide")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(11)
            .SetActive(9)
            .SetRecovery(15)
            .SetContact(FrameData.Attack.Level[2].HitstunStand)
            .SetBlockAdvantage(-10)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("22K")
                    .LinksInto(
                        new Animation.AnimationBuilder()
                            .SetName("22KHold")
                            .SetAnimationId("rbxassetid://94367547140383")
                            .SetPriority(Enum.AnimationPriority.Action)
                            .SetLooped(true)
                            .Construct()
                    )
                    .SetAnimationId("rbxassetid://72895271126106")
                    .Construct(),
            )
            .SetEffectAtFrame(0, (entity) =>
            {
                HideDolphin(entity)
                const { RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = entity.ControllerManager.FacingDirection.mul(RootPart.AssemblyMass * 0.4)
            })
            .SetEffectAtFrame(25, (entity) =>
            {
                const { RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = Vector3.zero;
            })
    )
    .Construct();

export default AnchorSlide;
